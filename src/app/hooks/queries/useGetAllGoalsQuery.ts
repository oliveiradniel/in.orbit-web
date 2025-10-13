import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetAllGoalsQuery() {
  const goalsService = makeGoalService();

  const { data, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: () => goalsService.getAll(),
  });

  return {
    goals: data?.goals ?? [],
    totalActiveGoals: data?.totalActiveGoals ?? 0,
    isSeekingAllGoals: isLoading,
  };
}
