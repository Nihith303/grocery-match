import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn(
      'min-h-screen w-full py-8 px-4 sm:px-6 lg:px-8',
      'bg-gradient-to-b from-transparent to-white/50 dark:to-black/50',
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="glass-container rounded-xl shadow-xl p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
