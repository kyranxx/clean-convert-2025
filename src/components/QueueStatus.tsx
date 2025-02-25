'use client';

import { useEffect, useState } from 'react';
import { conversionQueue } from '@/lib/conversionQueue';
import StatusBadge from './StatusBadge';

interface QueueStatusProps {
  className?: string;
}

export default function QueueStatus({ className = '' }: QueueStatusProps) {
  const [status, setStatus] = useState(() => conversionQueue.getQueueStatus());
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setStatus(conversionQueue.getQueueStatus());
    };

    conversionQueue.onProgress(() => updateStatus());
    conversionQueue.onComplete(() => updateStatus());
    conversionQueue.onError(() => updateStatus());

    // Initial status
    updateStatus();
  }, []);

  const handleRetryAll = async () => {
    setRetrying(true);
    try {
      conversionQueue.retryAllFailed();
    } finally {
      setRetrying(false);
    }
  };

  const handleRetryItem = (id: string) => {
    conversionQueue.retryFailedItem(id);
  };

  if (status.pending === 0 && status.processing === 0 && status.failed === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-3">
        {status.pending > 0 && (
          <StatusBadge
            status="info"
            text={`${status.pending} pending`}
          />
        )}
        {status.processing > 0 && (
          <StatusBadge
            status="warning"
            text={`${status.processing} processing`}
          />
        )}
        {status.completed > 0 && (
          <StatusBadge
            status="success"
            text={`${status.completed} completed`}
          />
        )}
        {status.failed > 0 && (
          <StatusBadge
            status="error"
            text={`${status.failed} failed`}
          />
        )}
      </div>

      {status.failed > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-content">Failed Conversions</h4>
            <button
              onClick={handleRetryAll}
              disabled={retrying}
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Retry All
            </button>
          </div>
          <div className="space-y-2">
            {status.items
              .filter(item => item.status === 'failed')
              .map(item => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-red-50/50 dark:bg-red-900/10 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-content">
                        {item.data.file.name}
                      </p>
                      <p className="text-xs text-content-light">
                        {item.error || 'Unknown error'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRetryItem(item.id)}
                    className="text-sm text-primary hover:text-primary-dark transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
