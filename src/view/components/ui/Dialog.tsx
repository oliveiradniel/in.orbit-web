import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/utils/cn';

function RdxDialog(props: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Dialog {...props} />;
}

function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
  return <DialogPrimitive.Trigger {...props} />;
}

function DialogClose(props: DialogPrimitive.DialogCloseProps) {
  return <DialogPrimitive.Close {...props} />;
}

function DialogPortal(props: DialogPrimitive.DialogPortalProps) {
  return <DialogPrimitive.Portal {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-40 bg-black/40 backdrop-blur-sm',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  ...props
}: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Content
      className={cn(
        'fixed top-0 right-0 bottom-0 z-50 border-zinc-900 bg-zinc-950 p-8',
        className
      )}
      {...props}
    />
  );
}

function DialogTitle(props: DialogPrimitive.DialogTitleProps) {
  return <DialogPrimitive.Title className="text-lg font-semibold" {...props} />;
}

function DialogDescription(props: DialogPrimitive.DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      className="text-sm leading-relaxed text-zinc-400"
      {...props}
    />
  );
}

export const Dialog = {
  Root: RdxDialog,
  Trigger: DialogTrigger,
  Close: DialogClose,
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
};
