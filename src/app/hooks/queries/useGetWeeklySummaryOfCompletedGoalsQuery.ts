import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetWeeklySummaryOfCompletedGoalsQuery() {
  const goalService = makeGoalService();

  function getWeeklySummaryOfCompletedGoals() {
    return goalService.getWeeklySummaryOfCompletedGoals();
  }

  const { data } = useQuery({
    queryKey: ['weeklySummary'],
    queryFn: getWeeklySummaryOfCompletedGoals,
  });

  return {
    weeklySummaryOfCompletedGoals: data ?? null,
  };
}
