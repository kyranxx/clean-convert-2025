'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';

import { CreditType } from '@prisma/client';

interface User {
  id: string;
  email: string;
  credits: number;
  _count: {
    creditHistory: number;
  };
}

interface CreditHistory {
  id: string;
  amount: number;
  type: CreditType;
  createdAt: string;
}

export default function AdminCreditManager({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [creditType, setCreditType] = useState<CreditType>(CreditType.BONUS);
  const [userHistory, setUserHistory] = useState<CreditHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserSelect = async (userId: string) => {
    setSelectedUser(userId);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/credits?userId=${userId}`);
      const data = await response.json();
      if (data.creditHistory) {
        setUserHistory(data.creditHistory);
      }
    } catch (error) {
      console.error('Failed to fetch user credit history:', error);
      toast.error('Failed to fetch user credit history');
    }
    setIsLoading(false);
  };

  const handleCreditSubmit = async () => {
    if (!selectedUser || creditAmount <= 0) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/admin/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser,
          amount: creditAmount,
          type: creditType,
        }),
      });

      if (response.ok) {
        // Refresh user credit history
        handleUserSelect(selectedUser);
        setCreditAmount(0);
      } else {
        const errorData = await response.json();
        console.error('Failed to update credits:', errorData);
        toast.error(errorData.error || 'Failed to update credits');
      }
    } catch (error) {
      console.error('Failed to update credits:', error);
      toast.error('Failed to update credits');
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* User List */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-xl font-medium text-content-dark mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-content-light border-b">
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Credits</th>
                <th className="pb-3 font-medium">Transactions</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="text-sm">
                  <td className="py-3 pr-4">{user.email}</td>
                  <td className="py-3 pr-4">
                    <span className="font-medium">{user.credits}</span>
                  </td>
                  <td className="py-3 pr-4">{user._count.creditHistory}</td>
                  <td className="py-3">
                    <button
                      onClick={() => handleUserSelect(user.id)}
                      className="text-primary hover:text-primary-dark transition-colors"
                    >
                      Manage Credits
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credit Management */}
      {selectedUser && (
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-xl font-medium text-content-dark mb-6">Manage Credits</h2>
          
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div>
              <label className="block text-sm font-medium text-content mb-2">
                Credit Amount
              </label>
              <input
                type="number"
                min="1"
                value={creditAmount}
                onChange={(e) => setCreditAmount(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-background focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-content mb-2">
                Credit Type
              </label>
              <select
                value={creditType}
                onChange={(e) => setCreditType(e.target.value as CreditType)}
                className="w-full px-4 py-2 rounded-lg border border-background focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value={CreditType.BONUS}>Bonus</option>
                <option value={CreditType.REFUND}>Refund</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCreditSubmit}
            disabled={isLoading || creditAmount <= 0}
            className="w-full md:w-auto px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <LoadingSpinner size="sm" className="mr-2" />
                Processing...
              </span>
            ) : (
              'Add Credits'
            )}
          </button>

          {/* Credit History */}
          {userHistory.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-content-dark mb-4">Credit History</h3>
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
                    {userHistory.map((transaction) => (
                      <tr key={transaction.id} className="text-sm">
                        <td className="py-3 pr-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === CreditType.USAGE ? 'text-red-600 bg-red-50' :
                            transaction.type === CreditType.BONUS ? 'text-blue-600 bg-blue-50' :
                            transaction.type === CreditType.REFUND ? 'text-purple-600 bg-purple-50' :
                            'text-green-600 bg-green-50'
                          }`}>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
