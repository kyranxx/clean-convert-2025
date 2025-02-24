'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="relative inline-flex">
      <div 
        className={`
          inline-block animate-spin rounded-full 
          border-[2px] border-solid border-current border-r-transparent 
          motion-reduce:animate-[spin_1.5s_linear_infinite] 
          text-accent/30 dark:text-accent-dark/30
          ${sizeClasses[size]} ${className}
        `} 
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <div 
        className={`
          absolute inset-0 inline-block animate-[spin_3s_linear_infinite]
          rounded-full border-[2px] border-dashed border-accent dark:border-accent-dark
          ${sizeClasses[size]} ${className}
        `}
      />
    </div>
  );
}
