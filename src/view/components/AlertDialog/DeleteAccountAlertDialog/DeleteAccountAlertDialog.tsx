import { AlertDialog } from '@/view/components/Templates/AlertDialog';

import type { DeleteAccountAlertDialogProps } from '../types';

import { useDeleteAccountAlertDialogController } from './useDeleteAccountAlertDialogController';

export function DeleteAccountAlertDialog({
  isOpen,
  onClose,
}: DeleteAccountAlertDialogProps) {
  const { handleDeleteAccount, isDeletingAccount } =
    useDeleteAccountAlertDialogController();

  return (
    <AlertDialog
      title="Tem certeza que deseja excluir sua conta?"
      description="Todo o progresso, metas cadastradas e concluídas serão perdidas."
      isSubmitting={isDeletingAccount}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteAccount}
    />
  );
}
