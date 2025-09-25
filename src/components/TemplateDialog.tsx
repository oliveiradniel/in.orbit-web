import { X } from 'lucide-react';

import { Dialog as RdxDialog } from './ui/Dialog';

interface DialogTemplateProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  onClose?(): void;
}

export function DialogTemplate({
  children,
  title,
  description,
  isOpen,
  onClose,
}: DialogTemplateProps) {
  return (
    <RdxDialog.Root open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay />

        <RdxDialog.Content className="data-[state=open]:animate-dialog-open data-[state=closed]:animate-dialog-close w-[400px] border-l border-zinc-900 bg-zinc-950">
          <div className="flex h-full flex-col gap-6">
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

            {children}
          </div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
