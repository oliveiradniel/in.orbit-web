import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';
import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';

import { EmptyGoals } from '@/components/EmptyGoals';
import { LoadingGoals } from '@/components/LoadingGoals';
import { NewGoalDialog } from '@/components/NewGoalDialog';
import { Dialog } from '@/components/ui/Dialog';
import { WeeklySummary } from '@/components/WeeklySummary';

export function Dashboard() {
  const { isLoadingWeeklySummary } = useGetWeeklySummaryOfCompletedGoalsQuery();

  const { weeklyGoalsWithCompletionCount, isLoadingGoals } =
    useGetWeeklyGoalsWithCompletionCountQuery();

  const hasGoals =
    weeklyGoalsWithCompletionCount && weeklyGoalsWithCompletionCount.length > 0;

  return (
    <Dialog.Root>
      <NewGoalDialog />

      {(isLoadingGoals || isLoadingWeeklySummary) && <LoadingGoals />}

      {!(isLoadingGoals || isLoadingWeeklySummary) &&
        (hasGoals ? <WeeklySummary /> : <EmptyGoals />)}
    </Dialog.Root>
  );
}
