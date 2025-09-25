import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';

import { EmptyGoals } from '@/components/EmptyGoals';
import { LoadingGoals } from '@/components/LoadingGoals';
import { NewGoalDialog } from '@/components/NewGoalDialog';

import { useNewGoalDialogController } from '@/components/NewGoalDialog/useNewGoalDialogController';

import { WeeklySummary } from '@/components/WeeklySummary';

export function Dashboard() {
  const { weeklyGoalsWithCompletionCount, isLoadingGoals } =
    useGetWeeklyGoalsWithCompletionCountQuery();

  const {
    isNewGoalDialogOpen,
    handleOpenNewGoalDialog,
    handleCloseNewGoalDialog,
  } = useNewGoalDialogController();

  const hasGoals =
    weeklyGoalsWithCompletionCount && weeklyGoalsWithCompletionCount.length > 0;

  return (
    <div>
      <NewGoalDialog
        isOpen={isNewGoalDialogOpen}
        onClose={handleCloseNewGoalDialog}
      />

      {isLoadingGoals && <LoadingGoals />}

      {!isLoadingGoals && hasGoals ? (
        <WeeklySummary onOpenNewGoalDialog={handleOpenNewGoalDialog} />
      ) : (
        <EmptyGoals onOpenNewGoalDialog={handleOpenNewGoalDialog} />
      )}
    </div>
  );
}
