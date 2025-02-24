'use client';

interface LogoProps {
  showUnderline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
};

export default function Logo({ showUnderline = false, size = 'md', className = '' }: LogoProps) {
  return (
    <div className={`inline-block ${className}`}>
      <div className="relative">
        <div className={`font-bold tracking-tight ${sizeClasses[size]} bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent`}>
          Clean Convert
        </div>
        {showUnderline && (
          <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary opacity-70" />
        )}
      </div>
    </div>
  );
}
