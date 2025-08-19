import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetWeeklySummaryOfCompletedGoalsQuery() {
  const goalService = makeGoalService();

  function getWeeklySummaryOfCompletedGoalsQuery() {
    return goalService.getWeeklySummaryOfCompletedGoals();
  }

  const { data } = useQuery({
    queryKey: ['weeklySummary'],
    queryFn: getWeeklySummaryOfCompletedGoalsQuery,
  });

  return {
    weeklySummaryOfCompletedGoalsQuery: data ?? null,
  };
}
