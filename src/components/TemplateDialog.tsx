import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Dialog as RdxDialog } from './ui/Dialog';

interface DialogTemplateProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  hasAction: boolean;
  isSubmitting?: boolean;
  onSubmit?: () => void;
  onClose?: () => void;
}

export function DialogTemplate({
  children,
  title,
  description,
  isOpen,
  hasAction,
  isSubmitting,
  onSubmit,
  onClose,
}: DialogTemplateProps) {
  return (
    <RdxDialog.Root open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay />

        <RdxDialog.Content className="data-[state=open]:animate-dialog-open data-[state=closed]:animate-dialog-close flex h-screen w-[400px] flex-col gap-6 border-l border-zinc-900 bg-zinc-950">
          <form onSubmit={onSubmit} className="flex h-full flex-col gap-4">
            <header className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <RdxDialog.Title>{title}</RdxDialog.Title>

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

              <RdxDialog.Description>{description}</RdxDialog.Description>
            </header>

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
