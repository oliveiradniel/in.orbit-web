import { X } from 'lucide-react';

import { AlertDialog } from '../ui/AlertDialog';
import { Button } from '../ui/Button';

interface TemplateAlertDialogProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  actionButtonLabel?: string;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function TemplateAlertDialog({
  children,
  title,
  description,
  isOpen,
  actionButtonLabel,
  onClose,
  onSubmit,
  isSubmitting,
}: TemplateAlertDialogProps) {
  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose?.()}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay />

        <AlertDialog.Content className="data-[state=open]:animate-alert-dialog-content-open data-[state=closed]:animate-alert-dialog-content-close">
          <div className="flex h-full flex-col gap-6">
            <header className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <AlertDialog.Title className="text-red-400">
                  {title}
                </AlertDialog.Title>

                <AlertDialog.Cancel asChild>
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
                </AlertDialog.Cancel>
              </div>

              <AlertDialog.Description>{description}</AlertDialog.Description>
            </header>

            {children && children}

            <div className="flex items-center gap-3">
              <AlertDialog.Cancel asChild>
                <Button
                  aria-label="Fechar"
                  type="button"
                  variant="secondary"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </AlertDialog.Cancel>
              <Button
                type="button"
                variant="danger"
                isLoading={isSubmitting}
                onClick={onSubmit}
                className="flex-1"
              >
                {actionButtonLabel ? actionButtonLabel : 'Excluir'}
              </Button>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
