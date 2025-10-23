import type { QueryClient } from '@tanstack/react-query';

type QueryKeys =
  | ['goals']
  | ['totalQuantityOfGoalsCompleted']
  | ['userLevel']
  | ['weeklyGoals']
  | ['weeklySummary', string];

type InvalidateQueriesParams = {
  queryClient: QueryClient;
  keys: QueryKeys[];
};

export function invalidateQueries({
  queryClient,
  keys,
}: InvalidateQueriesParams) {
  keys.forEach((key) => {
    queryClient.invalidateQueries({ queryKey: key });
  });
}
