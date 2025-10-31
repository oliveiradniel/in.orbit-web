import { X } from 'lucide-react';

import { AlertDialog as RdxAlertDialog } from '@/view/components/ui/AlertDialog';
import { Button } from '@/view/components/ui/Button';

interface AlertDialogProps {
  children?: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  actionButtonLabel?: string;
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function AlertDialog({
  children,
  title,
  description,
  isOpen,
  actionButtonLabel,
  onClose,
  onSubmit,
  isSubmitting,
}: AlertDialogProps) {
  return (
    <RdxAlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose?.()}
    >
      <RdxAlertDialog.Portal>
        <RdxAlertDialog.Overlay />

        <RdxAlertDialog.Content className="data-[state=open]:animate-alert-dialog-open data-[state=closed]:animate-alert-dialog-close">
          <div className="flex h-full flex-col gap-6">
            <header className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <RdxAlertDialog.Title className="text-red-400">
                  {title}
                </RdxAlertDialog.Title>

                <RdxAlertDialog.Cancel asChild>
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
                </RdxAlertDialog.Cancel>
              </div>

              <RdxAlertDialog.Description>
                {description}
              </RdxAlertDialog.Description>
            </header>

            {children && children}

            <div className="flex items-center gap-3">
              <RdxAlertDialog.Cancel asChild>
                <Button
                  aria-label="Fechar"
                  type="button"
                  variant="secondary"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </RdxAlertDialog.Cancel>
              <Button
                aria-disabled={isSubmitting}
                type="button"
                variant="danger"
                disabled={isSubmitting}
                isLoading={isSubmitting}
                onClick={onSubmit}
                className="flex-1"
              >
                {actionButtonLabel ? actionButtonLabel : 'Excluir'}
              </Button>
            </div>
          </div>
        </RdxAlertDialog.Content>
      </RdxAlertDialog.Portal>
    </RdxAlertDialog.Root>
  );
}
