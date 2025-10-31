import type { CheckedState } from '@radix-ui/react-checkbox';
import type { UserResponse } from '@/@types/UserResponse';

export interface GoalData {
  id: string;
  title: string;
}

export interface DeleteGoalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGoals: GoalData[];
  isDeleteButtonDisabled: boolean;
  toggleCheckboxGoalId: (isChecked: CheckedState, goalData: GoalData) => void;
  onOpenNewGoalDialog: () => void;
}

export interface ProfileDialogProps {
  userData: UserResponse;
  isOpen: boolean;
  onClose: () => void;
}

export interface NewGoalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
