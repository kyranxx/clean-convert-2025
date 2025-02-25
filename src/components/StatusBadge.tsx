'use client';

interface StatusBadgeProps {
  status: 'success' | 'error' | 'warning' | 'info';
  text: string;
  className?: string;
}

const statusStyles = {
  success: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/20',
  error: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/20',
  warning: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/10 dark:text-yellow-400 dark:border-yellow-900/20',
  info: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20',
};

const statusIcons = {
  success: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  info: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export default function StatusBadge({ status, text, className = '' }: StatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 text-sm font-medium border rounded-full transition-colors duration-200 ${statusStyles[status]} ${className}`}
    >
      {statusIcons[status]}
      <span>{text}</span>
    </div>
  );
}
