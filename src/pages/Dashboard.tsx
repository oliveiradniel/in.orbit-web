import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';

import { EmptyGoals } from '@/components/EmptyGoals';
import { LoadingGoals } from '@/components/LoadingGoals';
import { NewGoalDialog } from '@/components/NewGoalDialog';
import { Dialog } from '@/components/ui/Dialog';
import { WeeklySummary } from '@/components/WeeklySummary';

export function Dashboard() {
  const { weeklyGoalsWithCompletionCount, isLoadingGoals } =
    useGetWeeklyGoalsWithCompletionCountQuery();

  const hasGoals =
    weeklyGoalsWithCompletionCount && weeklyGoalsWithCompletionCount.length > 0;

  return (
    <Dialog.Root>
      <NewGoalDialog />

      {isLoadingGoals && <LoadingGoals />}

      {!isLoadingGoals && hasGoals ? <WeeklySummary /> : <EmptyGoals />}
    </Dialog.Root>
  );
}
