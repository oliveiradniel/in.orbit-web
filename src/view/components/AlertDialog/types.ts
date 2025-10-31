import type { GoalData } from '../Dialog/types';

export interface DeleteGoalsAlertDialogProps {
  isOpen: boolean;
  selectedGoals: GoalData[];
  onClose: () => void;
}

export interface DeleteAccountAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
