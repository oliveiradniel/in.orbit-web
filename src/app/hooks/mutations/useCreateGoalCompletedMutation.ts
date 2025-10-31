import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';

import { makeGoalCompletedService } from '@/app/factories/makeGoalCompletedService';

import { invalidateQueries } from '@/utils/invalidateQueries';

import { toast } from '@/view/components/ui/Toast';

export function useCreateGoalCompletedMutation() {
  const queryClient = useQueryClient();

  const { weekStartsAt } = useSearch({ from: '/' });

  const goalCompletedService = makeGoalCompletedService();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      goalId,
      goalTitle,
    }: {
      goalId: string;
      goalTitle: string | undefined;
    }) => {
      await goalCompletedService.create(goalId);

      return goalTitle;
    },
    onSuccess: (goalTitle) => {
      invalidateQueries({
        queryClient,
        keys: [
          ['weeklySummary', weekStartsAt],
          ['weeklyGoals'],
          ['userLevel'],
          ['totalQuantityOfGoalsCompleted'],
        ],
      });

      toast({
        description: `A meta "${goalTitle}" foi concluída!`,
        type: 'success',
      });
    },
    onError: (goalTitle) => {
      toast({
        description: `Não foi possível completar a meta "${goalTitle}"!`,
        type: 'error',
      });
    },
  });

  return {
    createGoalCompleted: mutate,
    isCreatingGoalCompleted: isPending,
  };
}
