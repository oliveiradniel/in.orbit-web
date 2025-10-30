import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetAllGoalsQuery({
  enabled = true,
}: { enabled?: boolean } = {}) {
  const goalsService = makeGoalService();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['goals'],
    queryFn: () => goalsService.getAll(),
    enabled,
  });

  return {
    goals: data?.goals ?? [],
    totalActiveGoals: data?.totalActiveGoals ?? 0,
    isLoadingAllGoals: isLoading,
    hasErrorAllGoals: isError,
    refetchAllGoals: refetch,
  };
}
