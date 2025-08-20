import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';
import { delay } from '@/utils/delay';

export function useGetWeeklySummaryOfCompletedGoalsQuery() {
  const goalService = makeGoalService();

  async function getWeeklySummaryOfCompletedGoals() {
    await delay(3000);

    return goalService.getWeeklySummaryOfCompletedGoals();
  }

  const { data, isLoading } = useQuery({
    queryKey: ['weeklySummary'],
    queryFn: getWeeklySummaryOfCompletedGoals,
  });

  return {
    weeklySummaryOfCompletedGoals: data ?? null,
    isLoadingWeeklySummary: isLoading,
  };
}
