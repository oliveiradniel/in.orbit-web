import type { CheckedState } from '@radix-ui/react-checkbox';

import { useState } from 'react';
import { useGoalContext } from '@/app/contexts/GoalContext/useGoalContext';
import { useDeleteManyGoalMutation } from '@/app/hooks/mutations/useDeleteManyGoalMutation';

export interface GoalData {
  id: string;
  title: string;
}

export interface EditGoalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGoals: GoalData[];
  isDeleteButtonDisabled: boolean;
  toggleCheckboxGoalId: (isChecked: CheckedState, goalData: GoalData) => void;
  onDeleteManyGoals: () => void;
}

export function useEditGoalsDialogController() {
  const { activeGoals, totalActiveGoals } = useGoalContext();

  const [isEditGoalsDialogOpen, setIsEditGoalsDialogOpen] = useState(false);
  const [selectedGoalsData, setSelectedGoalsData] = useState<GoalData[]>([]);

  const isDeleteButtonDisabled = selectedGoalsData.length === 0;

  const { deleteManyGoals } = useDeleteManyGoalMutation();

  function handleOpenEditGoalsDialog() {
    setIsEditGoalsDialogOpen(true);
    setSelectedGoalsData([]);
  }

  function handleCloseEditGoalsDialog() {
    setIsEditGoalsDialogOpen(false);
    setSelectedGoalsData([]);
  }

  function handleGoalSelection(goalData: GoalData) {
    const goalExists = selectedGoalsData.some(
      (goal) => goal.id === goalData.id
    );

    if (goalExists) return;

    setSelectedGoalsData((prevState) => {
      return [...prevState, goalData];
    });
  }

  function handleGoalRemoval(goalData: GoalData) {
    setSelectedGoalsData((prevState) => {
      const newGoalsData = prevState.filter(
        (currentGoalData) => currentGoalData.id !== goalData.id
      );

      return newGoalsData;
    });
  }

  function toggleCheckboxGoalId(isChecked: CheckedState, goalData: GoalData) {
    if (isChecked) {
      handleGoalSelection(goalData);
    } else {
      handleGoalRemoval(goalData);
    }
  }

  async function handleDeleteManyGoals() {
    const idGoalsToBeDeleted = selectedGoalsData.map((goal) => goal.id);

    await deleteManyGoals(idGoalsToBeDeleted);
  }

  return {
    goals: activeGoals,
    totalOfGoals: totalActiveGoals,
    selectedGoalsData,
    isEditGoalsDialogOpen,
    isDeleteButtonDisabled,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
    toggleCheckboxGoalId,
    handleDeleteManyGoals,
  };
}
