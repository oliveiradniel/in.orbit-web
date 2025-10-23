import * as RdxProgress from '@radix-ui/react-progress';

import { cn } from '@/utils/cn';

export function Progress(props: RdxProgress.ProgressProps) {
  return (
    <RdxProgress.Progress
      {...props}
      className={cn('h-2 rounded-full bg-zinc-900', props.className)}
    />
  );
}

export function ProgressIndicator(props: RdxProgress.ProgressIndicatorProps) {
  return (
    <RdxProgress.Indicator
      {...props}
      className="h-2 w-1/2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
    />
  );
}
