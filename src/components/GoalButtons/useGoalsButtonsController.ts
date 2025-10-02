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
    queryClient.invalidateQueries({ queryKey: ['userLevel'] });
  }

  const goalsNotStarted = weeklyGoalsWithCompletionCount?.filter(
    (goal) => goal.status === 'not started'
  );
  const hasGoalsNotStarted = goalsNotStarted && goalsNotStarted.length > 0;

  const goalsStarted = weeklyGoalsWithCompletionCount?.filter(
    (goal) => goal.status === 'started'
  );
  const hasGoalsStarted = goalsStarted && goalsStarted.length > 0;

  const goalsCompleted = weeklyGoalsWithCompletionCount?.filter(
    (goal) => goal.status === 'completed'
  );
  const hasGoalsCompleted = goalsCompleted && goalsCompleted.length > 0;

  return {
    isRefetchingWeeklySummary,
    handleCreateGoalCompleted,
    goalsNotStarted,
    goalsStarted,
    goalsCompleted,
    hasGoalsNotStarted,
    hasGoalsStarted,
    hasGoalsCompleted,
  };
}
