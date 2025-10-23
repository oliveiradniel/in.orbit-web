import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export function Separator(props: ComponentProps<'div'>) {
  return <div {...props} className={cn('h-px bg-zinc-900', props.className)} />;
}
