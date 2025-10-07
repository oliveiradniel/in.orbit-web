import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useDeleteManyGoalMutation() {
  const queryClient = useQueryClient();

  const goalsService = makeGoalService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (goalsId: string[]) => goalsService.deleteMany(goalsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      queryClient.invalidateQueries({ queryKey: ['weeklyGoals'] });
    },
  });

  return {
    deleteManyGoals: mutateAsync,
    isDeletingGoals: isPending,
  };
}
