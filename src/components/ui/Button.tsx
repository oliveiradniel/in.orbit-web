import { Slot } from '@radix-ui/react-slot';
import { type ComponentProps, forwardRef } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

import { Spinner } from './Spinner';

const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 transition-colors ease-linear duration-300 cursor-pointer disabled:bg-zinc-900 disabled:cursor-default disabled:opacity-50 transition-all duration-300 ease-linear',

  variants: {
    variant: {
      primary:
        'bg-violet-500 text-violet-50 hover:bg-violet-600 ring-violet-500 data-[is-loading=true]:bg-violet-500 data-[is-loading=true]:cursor-default',
      secondary: 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 ring-zinc-900',
      githubLogin: 'bg-white text-black hover:bg-white hover:opacity-80',
    },

    size: {
      default: 'px-4 py-2.5',
      icon: 'size-7',
      sm: 'px-3 py-1.5',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof button> & { isLoading?: boolean; asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button';

    return (
      <Component
        data-is-loading={isLoading}
        {...props}
        ref={ref}
        className={button({ variant, size, className })}
      >
        {isLoading ? <Spinner className="h-5 w-5 border-white" /> : children}
      </Component>
    );
  }
);

Button.displayName = 'Button';
