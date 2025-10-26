import { useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useDeleteManyGoalMutation } from '@/app/hooks/mutations/useDeleteManyGoalMutation';

import { invalidateQueries } from '@/utils/invalidateQueries';

import type { GoalData } from '../DeleteGoalsDialog/useDeleteGoalsDialogController';

export function useDeleteGoalAlertDialogController(
  selectedGoals?: GoalData[],
  onClose?: () => void
) {
  const queryClient = useQueryClient();

  const { weekStartsAt } = useSearch({ from: '/' });

  const [isDeleteGoalAlertDialogOpen, setisDeleteGoalAlertDialogOpen] =
    useState(false);

  const { deleteManyGoals, isDeletingGoals } = useDeleteManyGoalMutation();

  function handleOpenDeleteGoalAlert() {
    setisDeleteGoalAlertDialogOpen(true);
  }

  function handleCloseDeleteGoalAlert() {
    setisDeleteGoalAlertDialogOpen(false);
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
    } catch (error) {
      console.log('error', error);
    } finally {
      onClose?.();
    }
  }

  return {
    isDeleteGoalAlertDialogOpen,
    handleOpenDeleteGoalAlert,
    handleCloseDeleteGoalAlert,
    handleDeleteManyGoals,
    isDeletingGoals,
  };
}
