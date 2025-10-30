import { useMutation } from '@tanstack/react-query';

import { makeGoalCompletedService } from '@/app/factories/makeGoalCompletedService';

export function useCreateGoalCompletedMutation() {
  const goalCompletedService = makeGoalCompletedService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (goalId: string) => {
      return goalCompletedService.create(goalId);
    },
  });

  return {
    createGoalCompleted: mutateAsync,
    isCreatingGoalCompleted: isPending,
  };
}
