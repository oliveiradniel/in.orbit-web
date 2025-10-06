import { useQuery } from '@tanstack/react-query';

import { makeGoalService } from '@/app/factories/makeGoalService';

export function useGetAllGoalsQuery() {
  const goalsService = makeGoalService();

  const { data } = useQuery({
    queryKey: ['goals'],
    queryFn: () => goalsService.getAll(),
  });

  return {
    goals: data?.goals ?? [],
    total: data?.total ?? 0,
  };
}
