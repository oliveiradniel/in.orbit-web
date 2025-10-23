import { useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { useState } from 'react';
import { useDeleteManyGoalMutation } from '@/app/hooks/mutations/useDeleteManyGoalMutation';

import type { GoalData } from '../EditGoalsDialog/useEditGoalsDialogController';

export function useDeleteGoalAlertDialogController(
  selectedGoals?: GoalData[],
  onClose?: () => void
) {
  const queryClient = useQueryClient();

  const { weekStartsAt } = useSearch({ from: '/' });

  const [isDeleteGoalAlertDialogOpen, setisDeleteGoalAlertDialogOpen] =
    useState(false);

  const { deleteManyGoals, isDeletingGoals } = useDeleteManyGoalMutation();

  function handleOpenEditGoalsDialog() {
    setisDeleteGoalAlertDialogOpen(true);
  }

  function handleCloseEditGoalsDialog() {
    setisDeleteGoalAlertDialogOpen(false);
  }

  async function handleDeleteManyGoals() {
    if (!selectedGoals) return;

    const idGoalsToBeDeleted = selectedGoals.map((goal) => goal.id);

    try {
      await deleteManyGoals(idGoalsToBeDeleted);

      queryClient.invalidateQueries({
        queryKey: ['weeklySummary', weekStartsAt],
      });
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyGoals'] });
      queryClient.invalidateQueries({
        queryKey: ['totalQuantityOfGoalsCompleted'],
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      onClose?.();
    }
  }

  return {
    isDeleteGoalAlertDialogOpen,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
    handleDeleteManyGoals,
    isDeletingGoals,
  };
}
