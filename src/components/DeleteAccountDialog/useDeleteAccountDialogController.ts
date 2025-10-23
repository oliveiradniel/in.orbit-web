import { useState } from 'react';

export function useDeleteAccountDialogController() {
  const [isDeleteAccountDialogOpen, setisDeleteAccountDialogOpen] =
    useState(false);

  function handleOpenEditGoalsDialog() {
    setisDeleteAccountDialogOpen(true);
  }

  function handleCloseEditGoalsDialog() {
    setisDeleteAccountDialogOpen(false);
  }

  return {
    isDeleteAccountDialogOpen,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
  };
}
