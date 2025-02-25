import { Queue } from './queue';
import { SupportedFormat } from './types';
import { cacheManager } from './cacheManager';

export interface ConversionItem {
  file: File;
  fromFormat: SupportedFormat;
  toFormat: SupportedFormat;
  userId?: string;
}

interface ConversionResult {
  url: string;
  size: number;
}

class ConversionQueueManager {
  private queue: Queue<ConversionItem>;
  private static instance: ConversionQueueManager;

  private constructor() {
    this.queue = new Queue<ConversionItem>(
      this.processConversion.bind(this),
      {
        onProgress: (current, total) => {
          this.onProgressCallback?.(current, total);
        },
        onComplete: () => {
          this.onCompleteCallback?.();
        },
        onError: (error, item) => {
          this.onErrorCallback?.(error, item);
        },
      }
    );
  }

  private onProgressCallback?: (current: number, total: number) => void;
  private onCompleteCallback?: () => void;
  private onErrorCallback?: (error: Error, item: ConversionItem) => void;

  static getInstance(): ConversionQueueManager {
    if (!ConversionQueueManager.instance) {
      ConversionQueueManager.instance = new ConversionQueueManager();
    }
    return ConversionQueueManager.instance;
  }

  private async processConversion(item: ConversionItem): Promise<ConversionResult> {
    try {
      // Check cache first
      const cachedResult = await cacheManager.get(
        item.file,
        item.fromFormat,
        item.toFormat
      );

      if (cachedResult) {
        console.log('Cache hit:', item.file.name);
        return {
          url: cachedResult.url,
          size: cachedResult.size,
        };
      }

      console.log('Cache miss:', item.file.name);

      // Call the conversion API
      const formData = new FormData();
      formData.append('file', item.file);
      formData.append('toFormat', item.toFormat);
      if (item.userId) {
        formData.append('userId', item.userId);
      }

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Conversion failed');
      }

      const result = await response.json();

      // Cache the result
      await cacheManager.set(
        item.file,
        item.fromFormat,
        item.toFormat,
        result.url,
        result.size
      );

      return {
        url: result.url,
        size: result.size,
      };
    } catch (error) {
      console.error('Conversion error:', error);
      throw error;
    }
  }

  addToQueue(items: ConversionItem | ConversionItem[]): string[] {
    const itemArray = Array.isArray(items) ? items : [items];
    return this.queue.addBatch(itemArray);
  }

  getQueueStatus() {
    return {
      pending: this.queue.getPendingCount(),
      processing: this.queue.getProcessingCount(),
      completed: this.queue.getCompletedCount(),
      failed: this.queue.getFailedCount(),
      items: this.queue.getItems(),
    };
  }

  retryFailedItem(id: string) {
    this.queue.retry(id);
  }

  retryAllFailed() {
    this.queue.retryAll();
  }

  clearQueue() {
    this.queue.clear();
  }

  clearCompleted() {
    this.queue.clearCompleted();
  }

  onProgress(callback: (current: number, total: number) => void) {
    this.onProgressCallback = callback;
  }

  onComplete(callback: () => void) {
    this.onCompleteCallback = callback;
  }

  onError(callback: (error: Error, item: ConversionItem) => void) {
    this.onErrorCallback = callback;
  }
}

export const conversionQueue = ConversionQueueManager.getInstance();
