'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface Conversion {
  id: string;
  originalName: string;
  originalSize: number;
  convertedSize: number;
  fromFormat: string;
  toFormat: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  completedAt: string | null;
  error: string | null;
}

interface ConversionHistoryProps {
  conversions: Conversion[];
}

export default function ConversionHistory({ conversions }: ConversionHistoryProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const sortedConversions = [...conversions].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const getStatusColor = (status: Conversion['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600 bg-green-50';
      case 'FAILED':
        return 'text-red-600 bg-red-50';
      case 'PROCESSING':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-content-dark">Conversion History</h3>
          <button
            onClick={() => setSortOrder(order => order === 'desc' ? 'asc' : 'desc')}
            className="text-sm text-content-light hover:text-content transition-colors"
          >
            Sort by date {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>

        {sortedConversions.length === 0 ? (
          <p className="text-content-light text-center py-8">
            No conversions yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-content-light border-b">
                  <th className="pb-3 font-medium">File</th>
                  <th className="pb-3 font-medium">Conversion</th>
                  <th className="pb-3 font-medium">Size</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sortedConversions.map((conversion) => (
                  <tr key={conversion.id} className="text-sm">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-content">
                        {conversion.originalName}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-content-light">
                        {conversion.fromFormat.toUpperCase()} → {conversion.toFormat.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="text-content-light">
                        {formatFileSize(conversion.originalSize)} → {formatFileSize(conversion.convertedSize)}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversion.status)}`}>
                        {conversion.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-content-light">
                        {formatDistanceToNow(new Date(conversion.createdAt), { addSuffix: true })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
