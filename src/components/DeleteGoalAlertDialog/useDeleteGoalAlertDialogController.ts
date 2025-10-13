import { useState } from 'react';

export function useDeleteGoalAlertDialogController() {
  const [isDeleteGoalAlertDialogOpen, setisDeleteGoalAlertDialogOpen] =
    useState(false);

  function handleOpenEditGoalsDialog() {
    setisDeleteGoalAlertDialogOpen(true);
  }

  function handleCloseEditGoalsDialog() {
    setisDeleteGoalAlertDialogOpen(false);
  }

  return {
    isDeleteGoalAlertDialogOpen,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
  };
}
