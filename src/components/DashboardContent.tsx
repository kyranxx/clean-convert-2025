'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ConversionHistory from './ConversionHistory';
import CreditHistory from './CreditHistory';

interface DashboardContentProps {
  initialCredits: number;
  initialConversions: any[];
  initialCreditHistory: any[];
}

export default function DashboardContent({ 
  initialCredits,
  initialConversions,
  initialCreditHistory
}: DashboardContentProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [conversions, setConversions] = useState(initialConversions);
  const [creditHistory, setCreditHistory] = useState(initialCreditHistory);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [conversionsRes, creditHistoryRes] = await Promise.all([
          fetch('/api/conversions/history'),
          fetch('/api/credits/history')
        ]);

        if (conversionsRes.ok && creditHistoryRes.ok) {
          const [newConversions, newCreditHistory] = await Promise.all([
            conversionsRes.json(),
            creditHistoryRes.json()
          ]);
          setConversions(newConversions);
          setCreditHistory(newCreditHistory);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (status === 'loading' || isLoading) {
    return (
      <div className="text-content-light text-center py-8">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-content-dark">Dashboard</h1>
        <p className="text-content-light mt-2">
          Manage your conversions and credits
        </p>
      </div>

      {/* Credits Section */}
      <div>
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-xl font-medium text-content-dark mb-4">Credits</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-4xl font-semibold text-primary">
                {initialCredits}
              </p>
              <p className="text-content-light mt-1">Available credits</p>
            </div>
            <button 
              className="btn-primary"
              onClick={() => router.push('/dashboard/credits')}
            >
              Get More Credits
            </button>
          </div>
        </div>
      </div>

      {/* Conversion History */}
      <div>
        <ConversionHistory conversions={conversions} />
      </div>

      {/* Credit History */}
      <div>
        <CreditHistory transactions={creditHistory} />
      </div>
    </div>
  );
}
