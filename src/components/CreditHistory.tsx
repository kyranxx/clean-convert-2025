'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface CreditTransaction {
  id: string;
  amount: number;
  type: 'PURCHASE' | 'USAGE' | 'BONUS' | 'REFUND';
  createdAt: string;
}

interface CreditHistoryProps {
  transactions: CreditTransaction[];
}

export default function CreditHistory({ transactions }: CreditHistoryProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
  });

  const getTypeColor = (type: CreditTransaction['type']) => {
    switch (type) {
      case 'PURCHASE':
        return 'text-green-600 bg-green-50';
      case 'USAGE':
        return 'text-red-600 bg-red-50';
      case 'BONUS':
        return 'text-blue-600 bg-blue-50';
      case 'REFUND':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-soft overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-content-dark">Credit History</h3>
          <button
            onClick={() => setSortOrder(order => order === 'desc' ? 'asc' : 'desc')}
            className="text-sm text-content-light hover:text-content transition-colors"
          >
            Sort by date {sortOrder === 'desc' ? '↓' : '↑'}
          </button>
        </div>

        {sortedTransactions.length === 0 ? (
          <p className="text-content-light text-center py-8">
            No credit transactions yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-content-light border-b">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sortedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="text-sm">
                    <td className="py-3 pr-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount >= 0 ? '+' : ''}{transaction.amount}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-content-light">
                        {formatDistanceToNow(new Date(transaction.createdAt), { addSuffix: true })}
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
