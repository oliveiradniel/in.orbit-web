import { zodResolver } from '@hookform/resolvers/zod';

import { useId } from 'react';

import { type Resolver, useForm } from 'react-hook-form';

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
  } = useForm<GoalFormData>({
    resolver: zodResolver(CreateGoalSchema) as Resolver<GoalFormData>,
    defaultValues: {
      desiredWeeklyFrequency: 1,
    },
  });

  const handleSubmit = handleSubmitHookForm((data) => {
    console.log({ data });
  });

  return {
    inputTitleId,
    control,
    formErrors: formState.errors,
    register,
    handleSubmit,
  };
}
