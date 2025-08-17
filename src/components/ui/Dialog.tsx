import * as RdxDialog from '@radix-ui/react-dialog';

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

function DialogOverlay(props: RdxDialog.DialogOverlayProps) {
  return (
    <RdxDialog.Overlay
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      {...props}
    />
  );
}

function DialogContent(props: RdxDialog.DialogContentProps) {
  return (
    <RdxDialog.Content
      className="fixed top-0 right-0 bottom-0 z-50 border-zinc-900 bg-zinc-950 p-8"
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
