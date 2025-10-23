import { GoalContext } from '@/app/contexts/GoalContext';
import { GoalProvider } from '@/app/contexts/GoalContext/GoalProvider';
import { DeleteGoalsDialog } from '@/components/DeleteGoalsDialog';

import { useDeleteGoalsDialogController } from '@/components/DeleteGoalsDialog/useDeleteGoalsDialogController';

import { EmptyGoals } from '@/components/EmptyGoals';
import { LoadingGoals } from '@/components/LoadingGoals';
import { NewGoalDialog } from '@/components/NewGoalDialog';

import { useNewGoalDialogController } from '@/components/NewGoalDialog/useNewGoalDialogController';

import { WeeklySummary } from '@/components/WeeklySummary';

export function Dashboard() {
  const {
    isNewGoalDialogOpen,
    handleOpenNewGoalDialog,
    handleCloseNewGoalDialog,
  } = useNewGoalDialogController();

  const {
    isDeleteGoalsDialogOpen,
    isDeleteButtonDisabled,
    selectedGoalsData,
    toggleCheckboxGoalId,
    handleOpenDeleteGoalsDialog,
    handleCloseDeleteGoalsDialog,
  } = useDeleteGoalsDialogController();

  return (
    <GoalProvider>
      <GoalContext.Consumer>
        {({ hasAnyGoal, hasAnyActiveGoal, isSeekingAllGoals }) => (
          <>
            <NewGoalDialog
              isOpen={isNewGoalDialogOpen}
              onClose={handleCloseNewGoalDialog}
            />

            <DeleteGoalsDialog
              isOpen={isDeleteGoalsDialogOpen}
              onClose={handleCloseDeleteGoalsDialog}
              selectedGoals={selectedGoalsData}
              isDeleteButtonDisabled={isDeleteButtonDisabled}
              toggleCheckboxGoalId={toggleCheckboxGoalId}
              onOpenNewGoalDialog={handleOpenNewGoalDialog}
            />

            {isSeekingAllGoals && <LoadingGoals />}

            {!isSeekingAllGoals &&
              (hasAnyGoal ? (
                <WeeklySummary
                  hasAnyActiveGoal={hasAnyActiveGoal}
                  onOpenNewGoalDialog={handleOpenNewGoalDialog}
                  onOpenDeleteGoalsDialog={handleOpenDeleteGoalsDialog}
                />
              ) : (
                <EmptyGoals onOpenNewGoalDialog={handleOpenNewGoalDialog} />
              ))}
          </>
        )}
      </GoalContext.Consumer>
    </GoalProvider>
  );
}
