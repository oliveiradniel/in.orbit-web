import { useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';

import type { TypeFilter } from '@/app/contexts/GoalContext/GoalProvider';
import { useGoalContext } from '@/app/contexts/GoalContext/useGoalContext';
import { useCreateGoalCompletedMutation } from '@/app/hooks/mutations/useCreateGoalCompletedMutation';
import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';
import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';
import { invalidateQueries } from '@/utils/invalidateQueries';

export function useGoalsButtonsController(typeFilter: TypeFilter) {
  const queryClient = useQueryClient();

  const { weekStartsAt } = useSearch({ from: '/' });

  const { weeklyGoalsWithCompletionCount } =
    useGetWeeklyGoalsWithCompletionCountQuery();

  const { isRefetchingWeeklySummary } =
    useGetWeeklySummaryOfCompletedGoalsQuery();

  const { createGoalCompleted } = useCreateGoalCompletedMutation();

  async function handleCreateGoalCompleted(goalId: string) {
    await createGoalCompleted(goalId);

    invalidateQueries({
      queryClient,
      keys: [
        ['weeklySummary', weekStartsAt],
        ['weeklyGoals'],
        ['userLevel'],
        ['totalQuantityOfGoalsCompleted'],
      ],
    });
  }

  const { selectedGoalStatusFilter } = useGoalContext();

  const status = selectedGoalStatusFilter.status;

  const goalsDeleted = weeklyGoalsWithCompletionCount?.filter(
    (goal) => goal.isDeleted
  );

  const goalsNotStarted = weeklyGoalsWithCompletionCount?.filter(
    (goal) => goal.status === 'not started' && goal.isDeleted === false
  );
  const hasGoalsNotStarted = goalsNotStarted && goalsNotStarted.length > 0;

  const goalsStarted = weeklyGoalsWithCompletionCount?.filter(
    (goal) => goal.status === 'started' && goal.isDeleted === false
  );
  const hasGoalsStarted = goalsStarted && goalsStarted.length > 0;

  const goalsCompleted = weeklyGoalsWithCompletionCount?.filter(
    (goal) => goal.status === 'completed' && goal.isDeleted === false
  );
  const hasGoalsCompleted = goalsCompleted && goalsCompleted.length > 0;

  const shouldShowAllGoals = typeFilter === 'all-goals';
  const shouldShowActiveGoals = status === 'active';
  const shouldShowInactiveGoals = status === 'inactive';

  const shouldShowUnstartedGoals =
    (shouldShowAllGoals || typeFilter === 'not-started-goals') &&
    hasGoalsNotStarted &&
    shouldShowActiveGoals;

  const shouldShowStartedGoals =
    (shouldShowAllGoals || typeFilter === 'started-goals') &&
    hasGoalsStarted &&
    shouldShowActiveGoals;

  const shouldShowCompletedGoals =
    (shouldShowAllGoals || typeFilter === 'completed-goals') &&
    hasGoalsCompleted &&
    shouldShowActiveGoals;

  return {
    isRefetchingWeeklySummary,
    handleCreateGoalCompleted,
    status,
    goalsDeleted,
    goalsNotStarted,
    goalsStarted,
    goalsCompleted,
    hasGoalsNotStarted,
    hasGoalsStarted,
    hasGoalsCompleted,
    shouldShowActiveGoals,
    shouldShowUnstartedGoals,
    shouldShowStartedGoals,
    shouldShowCompletedGoals,
    shouldShowInactiveGoals,
  };
}
