interface DownloadItem {
  url: string;
  filename: string;
  size: number;
}

class DownloadManager {
  private static instance: DownloadManager;
  private downloads: Map<string, DownloadItem>;
  private onProgressCallback?: (completed: number, total: number) => void;
  private onCompleteCallback?: () => void;

  private constructor() {
    this.downloads = new Map();
  }

  static getInstance(): DownloadManager {
    if (!DownloadManager.instance) {
      DownloadManager.instance = new DownloadManager();
    }
    return DownloadManager.instance;
  }

  addDownload(id: string, item: DownloadItem) {
    this.downloads.set(id, item);
  }

  addBatchDownloads(items: Record<string, DownloadItem>) {
    Object.entries(items).forEach(([id, item]) => {
      this.addDownload(id, item);
    });
  }

  async downloadAll() {
    const total = this.downloads.size;
    let completed = 0;

    try {
      // Create a zip file if multiple files
      if (total > 1) {
        const JSZip = (await import('jszip')).default;
        const zip = new JSZip();

        // Add all files to the zip
        const downloadPromises = Array.from(this.downloads.entries()).map(
          async ([id, item]) => {
            try {
              const response = await fetch(item.url);
              const blob = await response.blob();
              zip.file(item.filename, blob);
              completed++;
              this.onProgressCallback?.(completed, total);
            } catch (error) {
              console.error(`Failed to download ${item.filename}:`, error);
            }
          }
        );

        await Promise.all(downloadPromises);

        // Generate and download the zip file
        const content = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'converted-images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        // Single file download
        const firstEntry = this.downloads.entries().next();
        if (!firstEntry.done) {
          const [id, item] = firstEntry.value;
          const link = document.createElement('a');
          link.href = item.url;
          link.download = item.filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          completed++;
          this.onProgressCallback?.(completed, total);
        }
      }

      this.onCompleteCallback?.();
      this.clear();
    } catch (error) {
      console.error('Download failed:', error);
      throw error;
    }
  }

  clear() {
    this.downloads.clear();
  }

  getDownloads() {
    return Array.from(this.downloads.values());
  }

  getTotalSize(): number {
    return Array.from(this.downloads.values()).reduce(
      (total, item) => total + item.size,
      0
    );
  }

  onProgress(callback: (completed: number, total: number) => void) {
    this.onProgressCallback = callback;
  }

  onComplete(callback: () => void) {
    this.onCompleteCallback = callback;
  }
}

export const downloadManager = DownloadManager.getInstance();
