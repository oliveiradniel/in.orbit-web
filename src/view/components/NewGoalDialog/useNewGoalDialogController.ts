import { zodResolver } from '@hookform/resolvers/zod';

import { useQueryClient } from '@tanstack/react-query';

import { useSearch } from '@tanstack/react-router';

import { AxiosError } from 'axios';

import { useId, useState } from 'react';

import { type Resolver, useForm } from 'react-hook-form';

import { useCreateGoalMutation } from '@/app/hooks/mutations/useCreateGoalMutation';

import {
  CreateGoalSchema,
  type GoalFormData,
} from '@/app/schemas/CreateGoalSchema';

import { errorLabels } from '@/config/constants';

import { invalidateQueries } from '@/utils/invalidateQueries';

export function useNewGoalDialogController() {
  const { weekStartsAt } = useSearch({ from: '/' });

  const inputTitleId = useId();

  const [isNewGoalDialogOpen, setIsNewGoalDialogOpen] = useState(false);

  const [requestErrorMessage, setRequestErrorMessage] = useState<
    string | undefined
  >(undefined);
  const possibleErrors = ['This title already in use.'];

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

    try {
      await createGoal(data);

      invalidateQueries({
        queryClient,
        keys: [
          ['weeklyGoals'],
          ['weeklySummary', weekStartsAt],
          ['goals'],
          ['totalQuantityOfGoalsCompleted'],
        ],
      });

      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message as string;

        if (possibleErrors.includes(errorMessage)) {
          setRequestErrorMessage(errorLabels[errorMessage]);
        }
      }
    }
  });

  function handleOpenNewGoalDialog() {
    setIsNewGoalDialogOpen(true);
  }

  function handleCloseNewGoalDialog() {
    setIsNewGoalDialogOpen(false);
  }

  function clearRequestErrorMessage() {
    setRequestErrorMessage(undefined);
  }

  return {
    inputTitleId,
    control,
    formErrors: formState.errors,
    requestErrorMessage,
    isCreationGoal,
    isNewGoalDialogOpen,
    register,
    handleSubmit,
    handleOpenNewGoalDialog,
    handleCloseNewGoalDialog,
    clearRequestErrorMessage,
  };
}
