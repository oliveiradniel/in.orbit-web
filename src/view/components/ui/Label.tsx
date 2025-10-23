import type { ComponentProps } from 'react';

import { cn } from '@/utils/cn';

export function Label(props: ComponentProps<'label'>) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: off
    <label
      {...props}
      className={cn(
        'text-sm leading-normal font-medium tracking-tight',
        props.className
      )}
    />
  );
}
