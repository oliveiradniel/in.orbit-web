import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';

import { EmptyGoals } from '@/components/EmptyGoals';
import { LoadingGoals } from '@/components/LoadingGoals';
import { NewGoalDialog } from '@/components/NewGoalDialog';
import { Dialog } from '@/components/ui/Dialog';
import { WeeklySummary } from '@/components/WeeklySummary';

export function Dashboard() {
  const { weeklySummaryOfCompletedGoals, isLoadingWeeklySummary } =
    useGetWeeklySummaryOfCompletedGoalsQuery();

  const hasGoals =
    weeklySummaryOfCompletedGoals && weeklySummaryOfCompletedGoals?.total > 0;

  return (
    <Dialog.Root>
      <NewGoalDialog />

      {isLoadingWeeklySummary && <LoadingGoals />}

      {!isLoadingWeeklySummary &&
        (hasGoals ? <WeeklySummary /> : <EmptyGoals />)}
    </Dialog.Root>
  );
}
