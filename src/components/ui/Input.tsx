import { type ComponentProps, forwardRef } from 'react';

import { cn } from '@/utils/cn';

type InputProps = ComponentProps<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={cn(
        'h-12 rounded-lg border border-zinc-900 bg-black px-4 text-sm placeholder-zinc-400 ring-pink-500/10 transition-colors duration-300 ease-linear outline-none hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4',
        props.className
      )}
    />
  );
});

Input.displayName = 'Input';
