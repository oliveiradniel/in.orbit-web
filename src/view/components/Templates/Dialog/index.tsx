import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { X } from 'lucide-react';

import { Button } from '@/view/components/ui/Button';
import { Dialog as RdxDialog } from '@/view/components/ui/Dialog';

type ToHide = ('title' | 'description')[];

interface DialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  hasAction: boolean;
  isSubmitting?: boolean;
  toHide?: ToHide;
  onSubmit?: () => void;
  onClose?: () => void;
}

export function Dialog({
  children,
  title,
  description,
  isOpen,
  hasAction,
  isSubmitting,
  toHide,
  onSubmit,
  onClose,
}: DialogProps) {
  return (
    <RdxDialog.Root open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay />

        <RdxDialog.Content className="data-[state=open]:animate-dialog-open data-[state=closed]:animate-dialog-close flex h-screen w-[400px] flex-col gap-6 border-l border-zinc-900 bg-zinc-950">
          <form onSubmit={onSubmit} className="flex h-full flex-col gap-4">
            {toHide?.includes('title') && toHide?.includes('description') ? (
              <VisuallyHidden>
                <RdxDialog.Title>{title}</RdxDialog.Title>
                <RdxDialog.Description>{description}</RdxDialog.Description>
              </VisuallyHidden>
            ) : (
              <header className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  {!toHide?.includes('title') && (
                    <RdxDialog.Title>{title}</RdxDialog.Title>
                  )}

                  <RdxDialog.Close asChild>
                    <button
                      aria-label="Fechar"
                      type="button"
                      className="cursor-pointer"
                    >
                      <X
                        aria-hidden="true"
                        className="size-5 text-zinc-600 transition-colors duration-300 ease-linear hover:text-zinc-700"
                      />
                    </button>
                  </RdxDialog.Close>
                </div>

                {!toHide?.includes('description') && (
                  <RdxDialog.Description>{description}</RdxDialog.Description>
                )}
              </header>
            )}

            <div className="flex-1 overflow-y-auto">{children}</div>

            <div className="flex items-center gap-3">
              <RdxDialog.Close asChild>
                <Button
                  aria-label="Fechar"
                  type="button"
                  variant="secondary"
                  className="flex-1"
                >
                  Fechar
                </Button>
              </RdxDialog.Close>
              {hasAction && (
                <Button
                  type={hasAction ? 'submit' : 'button'}
                  isLoading={isSubmitting}
                  className="flex-1"
                >
                  Salvar
                </Button>
              )}
            </div>
          </form>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
