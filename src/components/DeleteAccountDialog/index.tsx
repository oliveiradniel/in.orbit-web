import { TemplateAlertDialog } from '../TemplateAlertDialog';

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountDialog({
  isOpen,
  onClose,
}: DeleteAccountDialogProps) {
  return (
    <TemplateAlertDialog
      title="Tem certeza que deseja excluir sua conta?"
      description="Todo o progresso, metas cadastradas e concluídas serão perdidas."
      isSubmitting={false}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {}}
    />
  );
}
