import { SupportedFormat } from './types';

interface CacheKey {
  hash: string;
  fromFormat: SupportedFormat;
  toFormat: SupportedFormat;
}

interface CacheEntry {
  url: string;
  size: number;
  timestamp: number;
}

class CacheManager {
  private static instance: CacheManager;
  private cache: Map<string, CacheEntry>;
  private maxAge: number = 24 * 60 * 60 * 1000; // 24 hours
  private maxSize: number = 100 * 1024 * 1024; // 100MB
  private currentSize: number = 0;

  private constructor() {
    this.cache = new Map();
    this.loadFromLocalStorage();
  }

  static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  private generateKey({ hash, fromFormat, toFormat }: CacheKey): string {
    return `${hash}-${fromFormat}-${toFormat}`;
  }

  private async calculateHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  private loadFromLocalStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const data = localStorage.getItem('conversionCache');
      if (data) {
        const parsed = JSON.parse(data);
        this.cache = new Map(parsed.entries);
        this.currentSize = parsed.size;
        this.cleanup();
      }
    } catch (error) {
      console.error('Error loading cache from localStorage:', error);
      this.cache.clear();
      this.currentSize = 0;
    }
  }

  private saveToLocalStorage() {
    if (typeof window === 'undefined') return;
    
    try {
      const data = {
        entries: Array.from(this.cache.entries()),
        size: this.currentSize,
      };
      localStorage.setItem('conversionCache', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving cache to localStorage:', error);
    }
  }

  private cleanup() {
    const now = Date.now();
    let entries = Array.from(this.cache.entries());

    // Remove expired entries
    entries = entries.filter(([_, entry]) => {
      if (now - entry.timestamp > this.maxAge) {
        this.currentSize -= entry.size;
        return false;
      }
      return true;
    });

    // Sort by timestamp (oldest first)
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

    // Remove oldest entries if cache is too large
    while (this.currentSize > this.maxSize && entries.length > 0) {
      const [key, entry] = entries.shift()!;
      this.currentSize -= entry.size;
      this.cache.delete(key);
    }

    this.cache = new Map(entries);
    this.saveToLocalStorage();
  }

  async get(file: File, fromFormat: SupportedFormat, toFormat: SupportedFormat): Promise<CacheEntry | null> {
    const hash = await this.calculateHash(file);
    const key = this.generateKey({ hash, fromFormat, toFormat });
    const entry = this.cache.get(key);

    if (entry) {
      // Update timestamp on access
      entry.timestamp = Date.now();
      this.saveToLocalStorage();
      return entry;
    }

    return null;
  }

  async set(file: File, fromFormat: SupportedFormat, toFormat: SupportedFormat, url: string, size: number): Promise<void> {
    const hash = await this.calculateHash(file);
    const key = this.generateKey({ hash, fromFormat, toFormat });
    
    // Remove old entry if it exists
    const oldEntry = this.cache.get(key);
    if (oldEntry) {
      this.currentSize -= oldEntry.size;
    }

    // Add new entry
    const entry: CacheEntry = {
      url,
      size,
      timestamp: Date.now(),
    };

    this.cache.set(key, entry);
    this.currentSize += size;

    // Cleanup if necessary
    if (this.currentSize > this.maxSize) {
      this.cleanup();
    } else {
      this.saveToLocalStorage();
    }
  }

  clear(): void {
    this.cache.clear();
    this.currentSize = 0;
    this.saveToLocalStorage();
  }
}

export const cacheManager = CacheManager.getInstance();
