import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export function OutlineButton(props: ComponentProps<'button'>) {
  return (
    <button
      {...props}
      className={cn(
        'flex items-center gap-2 rounded-full border border-dashed border-zinc-800 px-3 py-2 text-sm leading-none text-zinc-300 ring-pink-500/10 outline-none hover:border-zinc-700 focus-visible:border-pink-500 focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50',
        props.className
      )}
    />
  );
}
