import { GoalContext } from '@/app/contexts/GoalContext';
import { GoalProvider } from '@/app/contexts/GoalContext/GoalProvider';
import { EditGoalsDialog } from '@/components/EditGoalsDialog';

import { useEditGoalsDialogController } from '@/components/EditGoalsDialog/useEditGoalsDialogController';

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
    isEditGoalsDialogOpen,
    isDeleteButtonDisabled,
    selectedGoalsData,
    toggleCheckboxGoalId,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
  } = useEditGoalsDialogController();

  return (
    <GoalProvider>
      <GoalContext.Consumer>
        {({ hasAnyGoal, hasAnyActiveGoal, isSeekingAllGoals }) => (
          <>
            <NewGoalDialog
              isOpen={isNewGoalDialogOpen}
              onClose={handleCloseNewGoalDialog}
            />

            <EditGoalsDialog
              isOpen={isEditGoalsDialogOpen}
              onClose={handleCloseEditGoalsDialog}
              selectedGoals={selectedGoalsData}
              isDeleteButtonDisabled={isDeleteButtonDisabled}
              toggleCheckboxGoalId={toggleCheckboxGoalId}
            />

            {isSeekingAllGoals && <LoadingGoals />}

            {!isSeekingAllGoals &&
              (hasAnyGoal ? (
                <WeeklySummary
                  hasAnyActiveGoal={hasAnyActiveGoal}
                  onOpenNewGoalDialog={handleOpenNewGoalDialog}
                  onOpenEditGoalsDialog={handleOpenEditGoalsDialog}
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
