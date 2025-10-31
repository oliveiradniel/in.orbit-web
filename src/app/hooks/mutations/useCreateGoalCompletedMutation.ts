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
    mutationFn: (goalId: string) => goalCompletedService.create(goalId),
    onSuccess: () => {
      invalidateQueries({
        queryClient,
        keys: [
          ['weeklySummary', weekStartsAt],
          ['weeklyGoals'],
          ['userLevel'],
          ['totalQuantityOfGoalsCompleted'],
        ],
      });
    },
    onError: () => {
      toast({
        description: 'Não foi possível completar a meta.',
        type: 'error',
      });
    },
  });

  return {
    createGoalCompleted: mutate,
    isCreatingGoalCompleted: isPending,
  };
}
