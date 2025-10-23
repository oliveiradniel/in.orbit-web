import * as RdxAlertDialog from '@radix-ui/react-alert-dialog';
import { cn } from '@/utils/cn';

function AlertDialogRoot({
  children,
  ...props
}: RdxAlertDialog.AlertDialogProps) {
  return <RdxAlertDialog.Root {...props}>{children}</RdxAlertDialog.Root>;
}

function AlertDialogPortal({
  children,
  ...props
}: RdxAlertDialog.AlertDialogPortalProps) {
  return <RdxAlertDialog.Portal {...props}>{children}</RdxAlertDialog.Portal>;
}

function AlertDialogOverlay({
  className,
  ...props
}: RdxAlertDialog.AlertDialogOverlayProps) {
  return (
    <RdxAlertDialog.Overlay
      {...props}
      className={cn(
        'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50 bg-black/40 backdrop-blur-sm',
        className
      )}
    />
  );
}

function AlertDialogContent({
  children,
  className,
  ...props
}: RdxAlertDialog.AlertDialogContentProps) {
  return (
    <RdxAlertDialog.Content
      {...props}
      className={cn(
        'fixed top-1/2 left-1/2 z-60 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-900 bg-zinc-950 p-8',
        className
      )}
    >
      {children}
    </RdxAlertDialog.Content>
  );
}

function AlertDialogTitle({
  children,
  className,
  ...props
}: RdxAlertDialog.AlertDialogTitleProps) {
  return (
    <RdxAlertDialog.Title
      {...props}
      className={cn('text-lg font-semibold', className)}
    >
      {children}
    </RdxAlertDialog.Title>
  );
}

function AlertDialogDescription({
  children,
  className,
  ...props
}: RdxAlertDialog.AlertDialogDescriptionProps) {
  return (
    <RdxAlertDialog.Description
      {...props}
      className={cn('text-sm leading-relaxed text-zinc-400', className)}
    >
      {children}
    </RdxAlertDialog.Description>
  );
}

function AlertDialogCancel({
  children,
  className,
  ...props
}: RdxAlertDialog.AlertDialogCancelProps) {
  return (
    <RdxAlertDialog.Cancel {...props} className={cn('', className)}>
      {children}
    </RdxAlertDialog.Cancel>
  );
}

export const AlertDialog = {
  Root: AlertDialogRoot,
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Content: AlertDialogContent,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Cancel: AlertDialogCancel,
};
