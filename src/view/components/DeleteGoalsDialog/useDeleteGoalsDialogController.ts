import type { CheckedState } from '@radix-ui/react-checkbox';

import { useState } from 'react';
import { useGoalContext } from '@/app/contexts/GoalContext/useGoalContext';

export interface GoalData {
  id: string;
  title: string;
}

export interface DeleteGoalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGoals: GoalData[];
  isDeleteButtonDisabled: boolean;
  toggleCheckboxGoalId: (isChecked: CheckedState, goalData: GoalData) => void;
  onOpenNewGoalDialog: () => void;
}

export function useDeleteGoalsDialogController() {
  const { activeGoals, hasActiveGoals, totalActiveGoals } = useGoalContext();

  const [isDeleteGoalsDialogOpen, setIsDeleteGoalsDialogOpen] = useState(false);
  const [selectedGoalsData, setSelectedGoalsData] = useState<GoalData[]>([]);

  const isDeleteButtonDisabled = selectedGoalsData.length === 0;

  function handleOpenDeleteGoalsDialog() {
    setIsDeleteGoalsDialogOpen(true);
    setSelectedGoalsData([]);
  }

  function handleCloseDeleteGoalsDialog() {
    setIsDeleteGoalsDialogOpen(false);
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

  return {
    goals: activeGoals,
    totalActiveGoals,
    hasActiveGoals,
    selectedGoalsData,
    isDeleteGoalsDialogOpen,
    isDeleteButtonDisabled,
    handleOpenDeleteGoalsDialog,
    handleCloseDeleteGoalsDialog,
    toggleCheckboxGoalId,
  };
}
