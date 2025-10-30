import { GoalContext } from '@/app/contexts/GoalContext';
import { GoalProvider } from '@/app/contexts/GoalContext/GoalProvider';

import { DeleteGoalsDialog } from '@/view/components/DeleteGoalsDialog';

import { useDeleteGoalsDialogController } from '@/view/components/DeleteGoalsDialog/useDeleteGoalsDialogController';

import { EmptyGoals } from '@/view/components/EmptyGoals';
import { LoadingGoals } from '@/view/components/LoadingGoals';
import { NewGoalDialog } from '@/view/components/NewGoalDialog';

import { useNewGoalDialogController } from '@/view/components/NewGoalDialog/useNewGoalDialogController';

import { WeeklySummary } from '@/view/components/WeeklySummary';
import { ErrorGoals } from '../components/ErrorGoals';

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
        {({
          hasGoals,
          hasActiveGoals,
          isLoadingAllGoals,
          hasErrorAllGoals,
        }) => (
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
