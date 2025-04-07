
import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      'min-h-screen w-full py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-8',
      'bg-gradient-to-b from-transparent to-white/50 dark:to-black/50',
      className
    )}>
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "glass-container rounded-xl shadow-xl",
          "p-3 sm:p-6 md:p-8", // Responsive padding
          isMobile ? "overflow-x-hidden" : "" // Prevent horizontal scroll on mobile
        )}>
          {children}
        </div>
      </div>
    </div>
  );
}
