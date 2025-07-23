"use client";

import { cn } from "@/lib/utils";

type ScrollIndicatorProps = {
  isPulsing: boolean;
};

export function ScrollIndicator({ isPulsing }: ScrollIndicatorProps) {
  return (
    <div className="text-center">
        <div
          className={cn(
            "w-8 h-8 rounded-full bg-primary/50 transition-all duration-300 mx-auto",
            isPulsing && "animate-subtle-pulse bg-accent"
          )}
        ></div>
        <p className="mt-2 text-xs uppercase tracking-widest text-foreground/70">
          Rhythm
        </p>
    </div>
  );
}
