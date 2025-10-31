import { GoalContext } from '@/app/contexts/GoalContext';
import { GoalProvider } from '@/app/contexts/GoalContext/GoalProvider';
import { DeleteGoals } from '@/view/components/Dialog/DeleteGoalsDialog';
import { NewGoal } from '@/view/components/Dialog/NewGoalDialog';
import { EmptyGoals } from '@/view/components/EmptyGoals';
import { LoadingGoals } from '@/view/components/LoadingGoals';
import { WeeklySummary } from '@/view/components/WeeklySummary';
import { ErrorGoals } from '../components/ErrorGoals';

export function Dashboard() {
  const {
    isNewGoalDialogOpen,
    handleOpenNewGoalDialog,
    handleCloseNewGoalDialog,
  } = NewGoal.useController();

  const {
    isDeleteGoalsDialogOpen,
    isDeleteButtonDisabled,
    selectedGoalsData,
    toggleCheckboxGoalId,
    handleOpenDeleteGoalsDialog,
    handleCloseDeleteGoalsDialog,
  } = DeleteGoals.useController();

  return (
    <GoalProvider>
      <GoalContext.Consumer>
        {({
          hasGoals,
          hasActiveGoals,
          isLoadingAllGoals,
          hasErrorAllGoals,
        }) => (
          <>
            <NewGoal.Dialog
              isOpen={isNewGoalDialogOpen}
              onClose={handleCloseNewGoalDialog}
            />

            <DeleteGoals.Dialog
              isOpen={isDeleteGoalsDialogOpen}
              onClose={handleCloseDeleteGoalsDialog}
              selectedGoals={selectedGoalsData}
              isDeleteButtonDisabled={isDeleteButtonDisabled}
              toggleCheckboxGoalId={toggleCheckboxGoalId}
              onOpenNewGoalDialog={handleOpenNewGoalDialog}
            />

            {isLoadingAllGoals && <LoadingGoals />}

            {!isLoadingAllGoals &&
              (hasErrorAllGoals ? (
                <ErrorGoals />
              ) : hasGoals ? (
                <WeeklySummary
                  hasActiveGoal={hasActiveGoals}
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
