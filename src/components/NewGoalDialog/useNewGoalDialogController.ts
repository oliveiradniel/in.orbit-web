import { zodResolver } from '@hookform/resolvers/zod';

import { useId } from 'react';

import { type Resolver, useForm } from 'react-hook-form';
import type z from 'zod';
import { CreateGoalSchema } from '@/app/schemas/CreateGoalSchema';

type FormData = z.infer<typeof CreateGoalSchema>;

export function useNewGoalDialogController() {
  const inputTitleId = useId();

  const {
    control,
    handleSubmit: handleSubmitHookForm,
    register,
  } = useForm<FormData>({
    resolver: zodResolver(CreateGoalSchema) as Resolver<FormData>,
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
    register,
    handleSubmit,
  };
}
