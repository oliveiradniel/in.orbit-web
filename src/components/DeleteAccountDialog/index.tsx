import { TemplateAlertDialog } from '../TemplateAlertDialog';

import { useDeleteAccountDialogController } from './useDeleteAccountDialogController';

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountDialog({
  isOpen,
  onClose,
}: DeleteAccountDialogProps) {
  const { handleDeleteAccount, isDeleting } =
    useDeleteAccountDialogController();

  return (
    <TemplateAlertDialog
      title="Tem certeza que deseja excluir sua conta?"
      description="Todo o progresso, metas cadastradas e concluídas serão perdidas."
      isSubmitting={isDeleting}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteAccount}
    />
  );
}
