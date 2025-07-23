
"use client";

import { MouseIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ScrollHintProps = {
  isVisible: boolean;
  isMobile: boolean;
};

export function ScrollHint({ isVisible, isMobile }: ScrollHintProps) {
  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 z-50 flex flex-col items-center justify-center gap-2 text-foreground/50 transition-opacity duration-500',
        isMobile ? 'bottom-48' : 'bottom-10',
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
    >
        <div className="relative">
            <MouseIcon className="h-10 w-10" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="h-2 w-1 animate-scroll-down rounded-full bg-foreground/50"></div>
            </div>
        </div>
      <p className="text-sm uppercase tracking-widest">Scroll to Continue</p>
    </div>
  );
}
