import * as RdxRadioGroup from '@radix-ui/react-radio-group';

import { CheckCircle2, Circle } from 'lucide-react';

export function RadioGroup(props: RdxRadioGroup.RadioGroupProps) {
  return (
    <RdxRadioGroup.RadioGroup {...props} className="flex flex-col gap-2" />
  );
}

export function RadioGroupItem(props: RdxRadioGroup.RadioGroupItemProps) {
  return (
    <RdxRadioGroup.RadioGroupItem
      {...props}
      className="group flex cursor-pointer items-center justify-between rounded-lg border border-zinc-900 bg-black px-4 py-2.5 ring-pink-500/10 transition-colors duration-300 ease-linear outline-none hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4 data-[state=checked]:border-pink-500 data-[state=checked]:bg-pink-500/5"
    />
  );
}

export function RadioGroupIndicator() {
  return (
    <>
      <Circle className="size-4 text-zinc-600 group-data-[state=checked]:hidden" />
      <CheckCircle2 className="hidden size-4 text-pink-500 group-data-[state=checked]:inline" />
    </>
  );
}
