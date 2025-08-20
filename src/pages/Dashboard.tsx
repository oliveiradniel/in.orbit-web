import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';

import { EmptyGoals } from '@/components/EmptyGoals';
import { LoadingGoals } from '@/components/LoadingGoals';
import { NewGoalDialog } from '@/components/NewGoalDialog';
import { Summary } from '@/components/Summary';
import { Dialog } from '@/components/ui/Dialog';

export function Dashboard() {
  const { weeklySummaryOfCompletedGoals, isLoadingWeeklySummary } =
    useGetWeeklySummaryOfCompletedGoalsQuery();

  const hasGoals =
    weeklySummaryOfCompletedGoals && weeklySummaryOfCompletedGoals?.total > 0;

  return (
    <Dialog.Root>
      <NewGoalDialog />

      {isLoadingWeeklySummary && <LoadingGoals />}

      {!isLoadingWeeklySummary && (hasGoals ? <Summary /> : <EmptyGoals />)}
    </Dialog.Root>
  );
}
