import * as Checkbox from '@radix-ui/react-checkbox';

import { Square, SquareCheck } from 'lucide-react';

export function CheckboxItem(props: Checkbox.CheckboxProps) {
  return (
    <Checkbox.Root
      {...props}
      className="group flex w-full items-center justify-between rounded-lg border border-zinc-900 bg-black px-4 py-2.5 ring-pink-500/10 transition-colors duration-300 ease-linear outline-none focus-visible:border-pink-500 focus-visible:ring-4 enabled:cursor-pointer enabled:hover:border-zinc-800 disabled:opacity-50 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500/5"
    >
      {props.children}
    </Checkbox.Root>
  );
}

export function CheckboxIndicator() {
  return (
    <>
      <Square className="size-4 text-zinc-600 group-data-[state=checked]:hidden" />
      <SquareCheck className="size-4 text-pink-500 group-data-[state=checked]:inline group-data-[state=unchecked]:hidden" />
    </>
  );
}
