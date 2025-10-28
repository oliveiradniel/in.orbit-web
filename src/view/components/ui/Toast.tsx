import { Check, X } from 'lucide-react';

import { toast as sonnerToast } from 'sonner';

import { cn } from '@/utils/cn';

interface ToastProps {
  id: string | number;
  type: 'success' | 'error';
  description: string;
}

function Toast({ id, type, description }: ToastProps) {
  return (
    <button
      type="button"
      onClick={() => sonnerToast.dismiss(id)}
      className="relative overflow-hidden rounded-full border border-zinc-900 bg-zinc-950/40 px-6 py-2.5"
    >
      <div
        className={cn(
          'absolute right-0 h-4 w-4 blur-lg',
          type === 'success' && 'bg-green-500/60',
          type === 'error' && 'bg-pink-500/60'
        )}
      />
      <div
        className={cn(
          'absolute right-0 h-4 w-4 blur-lg',
          type === 'success' && 'bg-green-500/60',
          type === 'error' && 'bg-violet-500/60'
        )}
      />

      <div className="flex items-center gap-2">
        {type === 'success' ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <X className="size-4 text-red-500" />
        )}
        <span className="flex-1 font-semibold text-zinc-400">
          {description}
        </span>
      </div>
    </button>
  );
}

export function toast({ type, description }: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast id={id} type={type} description={description} />
  ));
}
