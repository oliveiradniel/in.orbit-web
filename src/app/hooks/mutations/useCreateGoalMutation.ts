import { useMutation } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

import type { GoalFormData } from '@/app/schemas/CreateGoalSchema';

export function useCreateGoalMutation() {
  const goalService = makeGoalService();

  const { mutateAsync } = useMutation({
    mutationFn: (createGoalDTO: GoalFormData) => {
      return goalService.create(createGoalDTO);
    },
  });

  return {
    createGoal: mutateAsync,
  };
}
