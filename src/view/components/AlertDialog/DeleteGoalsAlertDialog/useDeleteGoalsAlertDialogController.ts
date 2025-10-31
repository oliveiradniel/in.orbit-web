import { useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useDeleteManyGoalMutation } from '@/app/hooks/mutations/useDeleteManyGoalMutation';

import { invalidateQueries } from '@/utils/invalidateQueries';

import type { GoalData } from '@/view/components/Dialog/types';

import { toast } from '@/view/components/ui/Toast';

export function useDeleteGoalsAlertDialogController(
  selectedGoals?: GoalData[],
  onClose?: () => void
) {
  const queryClient = useQueryClient();

  const { weekStartsAt } = useSearch({ from: '/' });

  const [isDeleteGoalsAlertDialogOpen, setisDeleteGoalsAlertDialogOpen] =
    useState(false);

  const { deleteManyGoals, isDeletingGoals } = useDeleteManyGoalMutation();

  function handleOpenDeleteGoalAlert() {
    setisDeleteGoalsAlertDialogOpen(true);
  }

  function handleCloseDeleteGoalAlert() {
    setisDeleteGoalsAlertDialogOpen(false);
  }

  async function handleDeleteManyGoals() {
    if (!selectedGoals || isDeletingGoals) return;

    const idGoalsToBeDeleted = selectedGoals.map((goal) => goal.id);

    try {
      await deleteManyGoals(idGoalsToBeDeleted);

      invalidateQueries({
        queryClient,
        keys: [
          ['weeklySummary', weekStartsAt],
          ['goals'],
          ['weeklyGoals'],
          ['totalQuantityOfGoalsCompleted'],
        ],
      });

      toast({
        description: `${selectedGoals.length} meta${selectedGoals.length === 1 ? '' : 's'} ${selectedGoals.length === 1 ? 'foi excluída!' : 'foram excluídas!'}`,
        type: 'successfulDelete',
      });

      onClose?.();
    } catch {
      toast({
        description: `Não possível excluir a meta${selectedGoals.length === 1 ? '' : 's'}!`,
        type: 'error',
      });
    }
  }

  return {
    isDeleteGoalsAlertDialogOpen,
    handleOpenDeleteGoalAlert,
    handleCloseDeleteGoalAlert,
    handleDeleteManyGoals,
    isDeletingGoals,
  };
}
