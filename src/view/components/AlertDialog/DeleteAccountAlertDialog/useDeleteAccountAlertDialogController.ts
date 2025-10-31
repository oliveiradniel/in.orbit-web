import { useState } from 'react';
import { useDeleteAccountMutation } from '@/app/hooks/mutations/useDeleteAccountMutation';

export function useDeleteAccountAlertDialogController() {
  const [isDeleteAccountDialogOpen, setisDeleteAccountDialogOpen] =
    useState(false);

  const { deleteAccount, isDeletingAccount } = useDeleteAccountMutation();

  function handleOpenDeleteAccountDialog() {
    setisDeleteAccountDialogOpen(true);
  }

  function handleCloseDeleteAccountDialog() {
    setisDeleteAccountDialogOpen(false);
  }

  function handleDeleteAccount() {
    if (isDeletingAccount) return;

    deleteAccount();
  }

  return {
    isDeleteAccountDialogOpen,
    isDeletingAccount,
    handleOpenDeleteAccountDialog,
    handleCloseDeleteAccountDialog,
    handleDeleteAccount,
  };
}
