import { useQuery } from '@tanstack/react-query';

import { useSearch } from '@tanstack/react-router';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetWeeklySummaryOfCompletedGoalsQuery() {
  const { weekStartsAt } = useSearch({ from: '/' });

  const goalService = makeGoalService();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['weeklySummary', weekStartsAt],
    queryFn: () =>
      goalService.getWeeklySummaryOfCompletedGoals({
        params: { weekStartsAt },
      }),
  });

  return {
    weeklySummaryOfCompletedGoals: data ?? null,
    isLoadingWeeklySummary: isLoading,
    isRefetchingWeeklySummary: isFetching,
    hasErrorWeeklySummary: isError,
    refetchWeeklySummary: refetch,
  };
}
