import type { CheckedState } from '@radix-ui/react-checkbox';

import { useState } from 'react';
import { useDeleteManyGoalMutation } from '@/app/hooks/mutations/useDeleteManyGoalMutation';
import { useGetAllGoalsQuery } from '@/app/hooks/queries/useGetAllGoalsQuery';

import type { Goal } from '@/entities/Goal';

export interface GoalData {
  id: string;
  title: string;
}

export interface EditGoalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  goals: Goal[];
  totalNumberOfGoals: number;
  isDeleteButtonDisabled: boolean;
  toggleCheckboxGoalId: (isChecked: CheckedState, goalData: GoalData) => void;
  onDeleteManyGoals: () => void;
}

export function useEditGoalsDialogController() {
  const [isEditGoalsDialogOpen, setIsEditGoalsDialogOpen] = useState(false);
  const [selectedGoalsData, setSelectedGoalsData] = useState<GoalData[]>([]);

  const { goals, total } = useGetAllGoalsQuery();

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
    goals,
    totalNumberOfGoals: total,
    selectedGoalsData,
    isEditGoalsDialogOpen,
    isDeleteButtonDisabled,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
    toggleCheckboxGoalId,
    handleDeleteManyGoals,
  };
}
