import * as RdxDialog from '@radix-ui/react-dialog';
import { cn } from '@/utils/cn';

interface RootProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose(): void;
}

function Root({ children, isOpen, onClose, ...props }: RootProps) {
  return (
    <RdxDialog.Root open={isOpen} onOpenChange={onClose} {...props}>
      {children}
    </RdxDialog.Root>
  );
}

function DialogTrigger(props: RdxDialog.DialogTriggerProps) {
  return <RdxDialog.Trigger {...props} />;
}

function DialogPortal(props: RdxDialog.DialogPortalProps) {
  return <RdxDialog.Portal {...props} />;
}

function DialogOverlay({ className, ...props }: RdxDialog.DialogOverlayProps) {
  return (
    <RdxDialog.Overlay
      className={cn(
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({ className, ...props }: RdxDialog.DialogContentProps) {
  return (
    <RdxDialog.Content
      className={cn(
        'fixed top-0 right-0 bottom-0 z-50 border-zinc-900 bg-zinc-950 p-8',
        className
      )}
      {...props}
    />
  );
}

function DialogTitle(props: RdxDialog.DialogTitleProps) {
  return <RdxDialog.Title className="text-lg font-semibold" {...props} />;
}

function DialogDescription(props: RdxDialog.DialogDescriptionProps) {
  return (
    <RdxDialog.Description
      className="text-sm leading-relaxed text-zinc-400"
      {...props}
    />
  );
}

export const Dialog = {
  Root,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
};
