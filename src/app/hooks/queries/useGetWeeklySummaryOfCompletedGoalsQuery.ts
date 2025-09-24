import { useQuery } from '@tanstack/react-query';

import { useSearch } from '@tanstack/react-router';

import { makeGoalService } from '@/app/factories/makeGoalService';
import { delay } from '@/utils/delay';

export function useGetWeeklySummaryOfCompletedGoalsQuery() {
  const { weekStartsAt } = useSearch({ from: '/' });

  const goalService = makeGoalService();

  async function getWeeklySummaryOfCompletedGoals() {
    await delay(3000);

    return goalService.getWeeklySummaryOfCompletedGoals({
      params: { weekStartsAt },
    });
  }

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['weeklySummary', weekStartsAt],
    queryFn: getWeeklySummaryOfCompletedGoals,
  });

  return {
    weeklySummaryOfCompletedGoals: data ?? null,
    isLoadingWeeklySummary: isLoading,
    isRefetchingWeeklySummary: isFetching,
  };
}
