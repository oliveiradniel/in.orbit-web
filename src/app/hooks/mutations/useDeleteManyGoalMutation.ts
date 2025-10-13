import { useMutation } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useDeleteManyGoalMutation() {
  const goalsService = makeGoalService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (goalsId: string[]) => goalsService.deleteMany(goalsId),
  });

  return {
    deleteManyGoals: mutateAsync,
    isDeletingGoals: isPending,
  };
}
