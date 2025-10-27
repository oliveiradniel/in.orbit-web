import * as RdxPopover from '@radix-ui/react-popover';

import { Check } from 'lucide-react';

import { type ComponentProps, useId, useState } from 'react';

import { cn } from '@/utils/cn';

type RootProps = RdxPopover.PopoverProps & {
  disabled?: boolean;
};

type ContentProps = RdxPopover.PopoverContentProps & {
  ariaLabel: string;
  listId?: string;
};

type ViewportProps = {
  children: React.ReactNode;
};

type ItemProps = ComponentProps<'button'> & {
  text: string;
  selectedValue: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
};

function Root({ children, disabled = false }: RootProps) {
  const [open, setOpen] = useState(false);

  function handleOpen(open: boolean) {
    if (disabled) return;

    setOpen(open);
  }

  return (
    <RdxPopover.Popover open={open} onOpenChange={handleOpen}>
      {children}
    </RdxPopover.Popover>
  );
}

function Trigger({
  children,
  className,
  disabled,
  ...props
}: RdxPopover.PopoverTriggerProps) {
  // biome-ignore lint/suspicious/noExplicitAny: Radix automatically adds the "data-state" attribute at runtime, but it's not typed in the component props.
  const expanded = (props as any)['data-state'] === 'open';
  const listId = props['aria-controls'];

  return (
    <RdxPopover.Trigger
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={expanded}
      aria-controls={listId}
      aria-autocomplete="none"
      aria-activedescendant={undefined}
      tabIndex={0}
      disabled={disabled}
      className={cn(
        'flex items-center justify-around gap-2 rounded-lg border border-zinc-900 bg-zinc-900 px-4 py-2 text-xs text-zinc-400 ring-violet-500 ring-offset-2 ring-offset-black transition-all duration-300 ease-linear outline-none focus-visible:ring-2 enabled:cursor-pointer enabled:hover:bg-zinc-800 disabled:opacity-50 data-[state=open]:cursor-default data-[state=open]:!bg-zinc-900',
        className
      )}
      {...props}
    >
      {children}
    </RdxPopover.Trigger>
  );
}

function Content({ children, className, ariaLabel, listId }: ContentProps) {
  const fallbackId = useId();
  const id = listId ?? fallbackId;

  return (
    <RdxPopover.Content
      id={id}
      role="listbox"
      aria-label={ariaLabel}
      className={cn(
        'data-[state=open]:animate-select-open data-[state=closed]:animate-select-close relative',
        className
      )}
    >
      {children}
    </RdxPopover.Content>
  );
}

function Viewport({ children }: ViewportProps) {
  return (
    <ul className="mt-1 flex flex-col gap-1 rounded-lg bg-zinc-900 p-1">
      {children}
    </ul>
  );
}

function Item({
  className,
  value,
  text,
  selectedValue,
  disabled = false,
  onSelect,
  ...props
}: ItemProps) {
  const isSelected = value === selectedValue;

  return (
    <li role="none">
      <button
        role="option"
        aria-selected={isSelected}
        tabIndex={-1}
        type="button"
        disabled={isSelected || disabled}
        onClick={onSelect}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg px-4 py-2 text-zinc-400 transition-colors duration-300 ease-linear enabled:cursor-pointer enabled:hover:bg-zinc-800',
          isSelected && 'bg-zinc-800/40',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        <span className="text-sm whitespace-nowrap">{text}</span>
        {isSelected && (
          <Check className="animate-fade-in size-3 text-violet-500" />
        )}
      </button>
    </li>
  );
}

export const Select = {
  Root,
  Trigger,
  Content,
  Viewport,
  Item,
};
