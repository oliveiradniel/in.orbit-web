import { useQuery } from '@tanstack/react-query';

import { makeGoalCompletedService } from '@/app/factories/makeGoalCompletedService';

export function useGetGoalsCompletedCountQuery() {
  const goalsCompletedService = makeGoalCompletedService();

  const { data, isError } = useQuery({
    queryKey: ['totalQuantityOfGoalsCompleted'],
    queryFn: () => goalsCompletedService.totalQuantity(),
  });

  return {
    goalsCompletedCount: data?.totalQuantity ? data.totalQuantity : 0,
    hasErrorGoalsCompletedCount: isError,
  };
}
