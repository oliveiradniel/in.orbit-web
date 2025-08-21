import { useQueryClient } from '@tanstack/react-query';

import { useCreateGoalCompletedMutation } from '@/app/hooks/mutations/useCreateGoalCompletedMutation';
import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';
import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';

export function useGoalsButtonsController() {
  const queryClient = useQueryClient();

  const { weeklyGoalsWithCompletionCount } =
    useGetWeeklyGoalsWithCompletionCountQuery();

  const { isRefetchingWeeklySummary } =
    useGetWeeklySummaryOfCompletedGoalsQuery();

  const { createGoalCompleted } = useCreateGoalCompletedMutation();

  async function handleCreateGoalCompleted(goalId: string) {
    await createGoalCompleted(goalId);

    queryClient.invalidateQueries({ queryKey: ['weeklySummary'] });
    queryClient.invalidateQueries({ queryKey: ['weeklyGoals'] });
  }

  return {
    weeklyGoalsWithCompletionCount,
    isRefetchingWeeklySummary,
    handleCreateGoalCompleted,
  };
}
