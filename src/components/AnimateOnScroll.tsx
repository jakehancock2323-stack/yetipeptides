import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' | 'scale-in';
}

export default function AnimateOnScroll({ 
  children, 
  className, 
  delay = 0,
  animation = 'fade-up' 
}: AnimateOnScrollProps) {
  const { ref, isVisible } = useScrollAnimation();

  const baseStyles = 'transition-all duration-700 ease-out';
  
  const hiddenStyles: Record<string, string> = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-in': 'opacity-0',
    'fade-left': 'opacity-0 -translate-x-8',
    'fade-right': 'opacity-0 translate-x-8',
    'scale-in': 'opacity-0 scale-95',
  };

  const visibleStyles = 'opacity-100 translate-y-0 translate-x-0 scale-100';

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        isVisible ? visibleStyles : hiddenStyles[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
