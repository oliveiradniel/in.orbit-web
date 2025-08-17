import { useState } from 'react';

export function useEmptyGoalsController() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleOpenDialog() {
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    setIsDialogOpen(false);
  }

  return {
    isDialogOpen,
    handleOpenDialog,
    handleCloseDialog,
  };
}
