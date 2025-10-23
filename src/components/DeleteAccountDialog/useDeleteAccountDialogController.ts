import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useDeleteAccountMutation } from '@/app/hooks/mutations/useDeleteAccountMutation';

export function useDeleteAccountDialogController() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [isDeleteAccountDialogOpen, setisDeleteAccountDialogOpen] =
    useState(false);

  const { deleteAccount, isDeleting } = useDeleteAccountMutation();

  function handleOpenEditGoalsDialog() {
    setisDeleteAccountDialogOpen(true);
  }

  function handleCloseEditGoalsDialog() {
    setisDeleteAccountDialogOpen(false);
  }

  async function handleDeleteAccount() {
    if (isDeleting) return;

    await deleteAccount();
    queryClient.clear();

    sessionStorage.setItem('userLeft', JSON.stringify(true));
    navigate({ to: '/login' });
  }

  return {
    isDeleteAccountDialogOpen,
    isDeleting,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
    handleDeleteAccount,
  };
}
