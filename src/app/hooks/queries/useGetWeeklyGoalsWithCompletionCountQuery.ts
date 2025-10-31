import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetWeeklyGoalsWithCompletionCountQuery() {
  const goalService = makeGoalService();
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['weeklyGoals'],
    queryFn: () => goalService.getWeeklyGoalsWithCompletionCount(),
  });

  return {
    weeklyGoalsWithCompletionCount: data ?? null,
    isLoadingWeeklyGoals: isPending,
    hasErrorWeeklyGoals: isError,
    refetchWeeklyGoals: refetch,
  };
}
