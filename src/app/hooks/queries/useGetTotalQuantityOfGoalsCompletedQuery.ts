import { useQuery } from '@tanstack/react-query';

import { makeGoalCompletedService } from '@/app/factories/makeGoalCompletedService';

export function useGetTotalQuantityOfGoalsCompletedQuery() {
  const goalsCompletedService = makeGoalCompletedService();

  const { data } = useQuery({
    queryKey: ['totalQuantityOfGoalsCompleted'],
    queryFn: () => goalsCompletedService.totalQuantity(),
  });

  return {
    goalsCompletedCount: data?.totalQuantity ? data.totalQuantity : 0,
  };
}
