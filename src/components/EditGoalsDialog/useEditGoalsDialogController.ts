import { useState } from 'react';

export function useEditGoalsDialogController() {
  const [isEditGoalsDialogOpen, setIsEditGoalsDialogOpen] = useState(false);

  function handleOpenEditGoalsDialog() {
    setIsEditGoalsDialogOpen(true);
  }

  function handleCloseEditGoalsDialog() {
    setIsEditGoalsDialogOpen(false);
  }

  return {
    isEditGoalsDialogOpen,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
  };
}
