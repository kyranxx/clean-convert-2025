'use client';

import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

export default function Tooltip({
  content,
  position = 'top',
  delay = 200,
  children,
  className = '',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const positionTooltip = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = -tooltipRect.height - 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.height + 8;
        left = (triggerRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - 8;
        break;
      case 'right':
        top = (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.width + 8;
        break;
    }

    setTooltipStyle({
      top: `${top}px`,
      left: `${left}px`,
    });
  };

  useEffect(() => {
    if (isVisible) {
      positionTooltip();
    }
  }, [isVisible]);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div
      ref={triggerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-dark-grey-800 dark:bg-dark-grey-700 rounded shadow-lg whitespace-nowrap transition-opacity duration-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={tooltipStyle}
          role="tooltip"
        >
          {content}
          <div
            className={`absolute w-2 h-2 bg-dark-grey-800 dark:bg-dark-grey-700 transform rotate-45 ${
              position === 'top'
                ? 'bottom-[-4px] left-1/2 -translate-x-1/2'
                : position === 'bottom'
                ? 'top-[-4px] left-1/2 -translate-x-1/2'
                : position === 'left'
                ? 'right-[-4px] top-1/2 -translate-y-1/2'
                : 'left-[-4px] top-1/2 -translate-y-1/2'
            }`}
          />
        </div>
      )}
    </div>
  );
}
