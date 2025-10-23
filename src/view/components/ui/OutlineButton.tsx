import type { ComponentProps } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-zinc-800 px-3 py-2 text-sm leading-none text-zinc-300 ring-pink-500/10 transition-all duration-300 ease-linear outline-none focus-visible:border-pink-500 focus-visible:ring-4 disabled:pointer-events-none hover:opacity-70',

  variants: {
    status: {
      notStarted: 'border-red-400 focus-visible:border-red-500 ring-red-500/20',
      started:
        'border-yellow-300 focus-visible:border-yellow-500 ring-yellow-300/20',
      completed: 'border-green-500',
    },
  },

  defaultVariants: {
    status: 'notStarted',
  },
});

type OutlineButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button>;

export function OutlineButton({
  status,
  className,
  ...props
}: OutlineButtonProps) {
  return <button {...props} className={button({ status, className })} />;
}
