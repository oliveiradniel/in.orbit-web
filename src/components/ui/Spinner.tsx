import type { ClassValue } from 'clsx';

import { cn } from '@/utils/cn';

interface SpinnerProps {
  className?: ClassValue;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'h-10 w-10 animate-spin rounded-full border-l-3 border-pink-500',
        className
      )}
    />
  );
}
