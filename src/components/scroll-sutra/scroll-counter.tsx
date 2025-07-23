"use client";

type ScrollCounterProps = {
  count: number;
};

export function ScrollCounter({ count }: ScrollCounterProps) {
  return (
    <div className="text-center">
        <p className="text-sm uppercase tracking-widest text-foreground/70">Scrolls</p>
        <p className="text-8xl font-bold font-headline text-primary drop-shadow-lg">
          {count}
        </p>
    </div>
  );
}
