import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';
import { EditGoalsDialog } from '@/components/EditGoalsDialog';
import { useEditGoalsDialogController } from '@/components/EditGoalsDialog/useEditGoalsDialogController';

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

  const {
    isEditGoalsDialogOpen,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
  } = useEditGoalsDialogController();

  const hasGoals =
    weeklyGoalsWithCompletionCount && weeklyGoalsWithCompletionCount.length > 0;

  return (
    <div>
      <NewGoalDialog
        isOpen={isNewGoalDialogOpen}
        onClose={handleCloseNewGoalDialog}
      />

      <EditGoalsDialog
        isOpen={isEditGoalsDialogOpen}
        onClose={handleCloseEditGoalsDialog}
      />

      {isLoadingGoals && <LoadingGoals />}

      {!isLoadingGoals && hasGoals ? (
        <WeeklySummary
          onOpenNewGoalDialog={handleOpenNewGoalDialog}
          onOpenEditGoalsDialog={handleOpenEditGoalsDialog}
        />
      ) : (
        !isLoadingGoals && (
          <EmptyGoals onOpenNewGoalDialog={handleOpenNewGoalDialog} />
        )
      )}
    </div>
  );
}
