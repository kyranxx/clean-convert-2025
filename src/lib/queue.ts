type QueueItem<T> = {
  id: string;
  data: T;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  result?: any;
};

export class Queue<T> {
  private items: QueueItem<T>[] = [];
  private processing = false;
  private onProcessItem: (item: T) => Promise<any>;
  private onProgress?: (current: number, total: number) => void;
  private onComplete?: () => void;
  private onError?: (error: Error, item: T) => void;

  constructor(
    processor: (item: T) => Promise<any>,
    options?: {
      onProgress?: (current: number, total: number) => void;
      onComplete?: () => void;
      onError?: (error: Error, item: T) => void;
    }
  ) {
    this.onProcessItem = processor;
    this.onProgress = options?.onProgress;
    this.onComplete = options?.onComplete;
    this.onError = options?.onError;
  }

  add(data: T): string {
    const id = crypto.randomUUID();
    this.items.push({
      id,
      data,
      status: 'pending',
    });
    this.processQueue();
    return id;
  }

  addBatch(items: T[]): string[] {
    return items.map(item => this.add(item));
  }

  private async processQueue() {
    if (this.processing || this.items.length === 0) return;

    this.processing = true;
    const totalItems = this.getPendingCount();
    let processedItems = 0;

    try {
      while (this.items.some(item => item.status === 'pending')) {
        const item = this.items.find(item => item.status === 'pending');
        if (!item) break;

        item.status = 'processing';
        try {
          const result = await this.onProcessItem(item.data);
          item.status = 'completed';
          item.result = result;
        } catch (error) {
          item.status = 'failed';
          item.error = error instanceof Error ? error.message : 'Unknown error';
          if (this.onError) {
            this.onError(error as Error, item.data);
          }
        }

        processedItems++;
        if (this.onProgress) {
          this.onProgress(processedItems, totalItems);
        }
      }

      if (this.onComplete) {
        this.onComplete();
      }
    } finally {
      this.processing = false;
    }
  }

  getItem(id: string): QueueItem<T> | undefined {
    return this.items.find(item => item.id === id);
  }

  getItems(): QueueItem<T>[] {
    return [...this.items];
  }

  getPendingCount(): number {
    return this.items.filter(item => item.status === 'pending').length;
  }

  getProcessingCount(): number {
    return this.items.filter(item => item.status === 'processing').length;
  }

  getCompletedCount(): number {
    return this.items.filter(item => item.status === 'completed').length;
  }

  getFailedCount(): number {
    return this.items.filter(item => item.status === 'failed').length;
  }

  clear() {
    this.items = [];
  }

  clearCompleted() {
    this.items = this.items.filter(item => item.status !== 'completed');
  }

  retry(id: string) {
    const item = this.items.find(item => item.id === id);
    if (item && item.status === 'failed') {
      item.status = 'pending';
      item.error = undefined;
      this.processQueue();
    }
  }

  retryAll() {
    this.items.forEach(item => {
      if (item.status === 'failed') {
        item.status = 'pending';
        item.error = undefined;
      }
    });
    this.processQueue();
  }
}
