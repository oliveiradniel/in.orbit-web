import { CheckIcon, Trash2, X } from 'lucide-react';

import { toast as sonnerToast } from 'sonner';

import { cn } from '@/utils/cn';

interface ToastProps {
  id: string | number;
  type: 'success' | 'error' | 'successfulDelete';
  description: string;
}

export function Toast({ id, type, description }: ToastProps) {
  return (
    <button
      type="button"
      onClick={() => sonnerToast.dismiss(id)}
      className="relative flex items-center gap-4 overflow-hidden rounded-xl bg-zinc-950 px-4 py-4"
    >
      {type === 'success' ? (
        <div className="rounded-md bg-green-600/6 p-2">
          <CheckIcon className="size-4 text-green-500" />
        </div>
      ) : type === 'error' ? (
        <div className="rounded-md bg-red-600/6 p-2">
          <X className="size-4 text-red-500" />
        </div>
      ) : (
        type === 'successfulDelete' && (
          <div className="rounded-md bg-blue-600/6 p-2">
            <Trash2 className="size-4 text-blue-500" />
          </div>
        )
      )}

      <div
        className={cn(
          'absolute left-0 h-full w-10 blur-2xl',
          type === 'success' && 'bg-green-500',
          type === 'error' && 'bg-red-500',
          type === 'successfulDelete' && 'bg-blue-500'
        )}
      />

      <div className="flex flex-col items-start justify-center">
        <span className="text-sm">{type === 'error' ? 'Erro' : 'Sucesso'}</span>

        <span className="text-xs text-zinc-400">{description}</span>
      </div>
    </button>
  );
}

export function toast({ type, description }: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast id={id} type={type} description={description} />
  ));
}
