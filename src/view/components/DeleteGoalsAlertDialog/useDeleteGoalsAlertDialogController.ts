import { useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useDeleteManyGoalMutation } from '@/app/hooks/mutations/useDeleteManyGoalMutation';

import { invalidateQueries } from '@/utils/invalidateQueries';

import type { GoalData } from '../DeleteGoalsDialog/useDeleteGoalsDialogController';

import { toast } from '../ui/Toast';

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

      onClose?.();
    } catch {
      toast({
        description:
          'Não possível excluir a(s) meta(s). Tente novamente mais tarde.',
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
