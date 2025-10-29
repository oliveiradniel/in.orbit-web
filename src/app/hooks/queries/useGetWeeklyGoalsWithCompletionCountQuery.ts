import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetWeeklyGoalsWithCompletionCountQuery() {
  const goalService = makeGoalService();

  function getWeeklyGoalsWithCompletionCount() {
    return goalService.getWeeklyGoalsWithCompletionCount();
  }

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['weeklyGoals'],
    queryFn: getWeeklyGoalsWithCompletionCount,
  });

  return {
    weeklyGoalsWithCompletionCount: data ?? null,
    isLoadingWeeklyGoals: isPending,
    hasErrorWeeklyGoals: isError,
    refetchWeeklyGoals: refetch,
  };
}
