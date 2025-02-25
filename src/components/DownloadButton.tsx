'use client';

import { useState } from 'react';
import { downloadManager } from '@/lib/downloadManager';
import LoadingSpinner from './LoadingSpinner';
import StatusBadge from './StatusBadge';

interface DownloadButtonProps {
  className?: string;
  files: Array<{
    id: string;
    url: string;
    filename: string;
    size: number;
  }>;
  onComplete?: () => void;
}

export default function DownloadButton({ className = '', files, onComplete }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Add files to download manager
      files.forEach(file => {
        downloadManager.addDownload(file.id, {
          url: file.url,
          filename: file.filename,
          size: file.size,
        });
      });

      // Set up progress tracking
      downloadManager.onProgress((completed, total) => {
        setProgress({ completed, total });
      });

      // Set up completion handler
      downloadManager.onComplete(() => {
        setIsDownloading(false);
        setProgress({ completed: 0, total: 0 });
        onComplete?.();
      });

      // Start download
      await downloadManager.downloadAll();
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      setProgress({ completed: 0, total: 0 });
    }
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const formattedSize = formatFileSize(totalSize);

  return (
    <div className={`space-y-2 ${className}`}>
      <button
        onClick={handleDownload}
        disabled={isDownloading || files.length === 0}
        className={`btn-primary w-full flex items-center justify-center gap-2 ${
          isDownloading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isDownloading ? (
          <>
            <LoadingSpinner size="sm" className="text-white" />
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>
              {files.length > 1
                ? `Download ${files.length} Files (${formattedSize})`
                : `Download File (${formattedSize})`}
            </span>
          </>
        )}
      </button>

      {isDownloading && progress.total > 0 && (
        <StatusBadge
          status="info"
          text={`Downloading ${progress.completed} of ${progress.total}`}
          className="w-full justify-center"
        />
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
