import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useId } from 'react';
import { type Resolver, useForm } from 'react-hook-form';
import { useCreateGoalMutation } from '@/app/hooks/mutations/useCreateGoalMutation';
import {
  CreateGoalSchema,
  type GoalFormData,
} from '@/app/schemas/CreateGoalSchema';

export function useNewGoalDialogController() {
  const inputTitleId = useId();

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

  const { createGoal } = useCreateGoalMutation();

  const handleSubmit = handleSubmitHookForm(async (data) => {
    await createGoal(data);

    queryClient.invalidateQueries({ queryKey: ['weeklyGoals'] });

    reset();
  });

  return {
    inputTitleId,
    control,
    formErrors: formState.errors,
    register,
    handleSubmit,
  };
}
