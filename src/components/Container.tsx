'use client';

import { ReactNode } from 'react';
import { spacing } from '@/styles/spacing';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: keyof JSX.IntrinsicElements;
}

export default function Container({
  children,
  className = '',
  size = 'lg',
  padding = 'md',
  as: Component = 'div',
}: ContainerProps) {
  const maxWidthClass = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }[size];

  const paddingClass = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
  }[padding];

  return (
    <Component
      className={`mx-auto ${maxWidthClass} ${paddingClass} ${className}`}
    >
      {children}
    </Component>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  spacing?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
}

export function Section({
  children,
  className = '',
  id,
  as: Component = 'section',
  containerSize = 'lg',
  spacing = 'md',
  containerClassName = '',
}: SectionProps) {
  const spacingClass = {
    sm: 'py-8',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-24',
  }[spacing];

  return (
    <Component id={id} className={`${spacingClass} ${className}`}>
      <Container size={containerSize} className={containerClassName}>
        {children}
      </Container>
    </Component>
  );
}

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  mdCols?: 1 | 2 | 3 | 4 | 5 | 6;
  lgCols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export function Grid({
  children,
  className = '',
  cols = 1,
  mdCols,
  lgCols,
  gap = 'md',
}: GridProps) {
  const colsClass = `grid-cols-${cols}`;
  const mdColsClass = mdCols ? `md:grid-cols-${mdCols}` : '';
  const lgColsClass = lgCols ? `lg:grid-cols-${lgCols}` : '';

  const gapClass = {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }[gap];

  return (
    <div
      className={`grid ${colsClass} ${mdColsClass} ${lgColsClass} ${gapClass} ${className}`}
    >
      {children}
    </div>
  );
}
