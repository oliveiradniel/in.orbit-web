import { useQuery } from '@tanstack/react-query';

import { makeGoalCompletedService } from '@/app/factories/makeGoalCompletedService';

export function useGetGoalsCompletedCountQuery() {
  const goalCompletedService = makeGoalCompletedService();

  const { data, isError } = useQuery({
    queryKey: ['totalQuantityOfGoalsCompleted'],
    queryFn: () => goalCompletedService.totalQuantity(),
  });

  return {
    goalsCompletedCount: data?.totalQuantity ? data.totalQuantity : 0,
    hasErrorGoalsCompletedCount: isError,
  };
}
