import { useMutation } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useDeleteManyGoalMutation() {
  const goalService = makeGoalService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (goalsId: string[]) => goalService.deleteMany(goalsId),
  });

  return {
    deleteManyGoals: mutateAsync,
    isDeletingGoals: isPending,
  };
}
