import { zodResolver } from '@hookform/resolvers/zod';

import { useQueryClient } from '@tanstack/react-query';
import { useId, useState } from 'react';
import { type Resolver, useForm } from 'react-hook-form';

import { useCreateGoalMutation } from '@/app/hooks/mutations/useCreateGoalMutation';
import {
  CreateGoalSchema,
  type GoalFormData,
} from '@/app/schemas/CreateGoalSchema';

export function useNewGoalDialogController() {
  const inputTitleId = useId();

  const [isNewGoalDialogOpen, setIsNewGoalDialogOpen] = useState(false);

  const {
    control,
    handleSubmit: handleSubmitHookForm,
    register,
    formState,
    reset,
  } = useForm<GoalFormData>({
    resolver: zodResolver(CreateGoalSchema) as Resolver<GoalFormData>,
    defaultValues: {
      desiredWeeklyFrequency: 1,
    },
  });
  const queryClient = useQueryClient();

  const { createGoal, isCreationGoal } = useCreateGoalMutation();

  const handleSubmit = handleSubmitHookForm(async (data) => {
    if (isCreationGoal) return;

    await createGoal(data);

    queryClient.invalidateQueries({ queryKey: ['weeklyGoals'] });

    reset();
  });

  function handleOpenNewGoalDialog() {
    setIsNewGoalDialogOpen(true);
  }

  function handleCloseNewGoalDialog() {
    setIsNewGoalDialogOpen(false);
  }

  return {
    inputTitleId,
    control,
    formErrors: formState.errors,
    isCreationGoal,
    isNewGoalDialogOpen,
    register,
    handleSubmit,
    handleOpenNewGoalDialog,
    handleCloseNewGoalDialog,
  };
}
