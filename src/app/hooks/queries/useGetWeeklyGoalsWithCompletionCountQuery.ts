import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetWeeklyGoalsWithCompletionCountQuery() {
  const goalService = makeGoalService();

  function getWeeklyGoalsWithCompletionCount() {
    return goalService.getWeeklyGoalsWithCompletionCount();
  }

  const { data } = useQuery({
    queryKey: ['weeklyGoals'],
    queryFn: getWeeklyGoalsWithCompletionCount,
  });

  return {
    weeklyGoalsWithCompletionCount: data ?? null,
  };
}
