import type { GoalData } from '../DeleteGoalsDialog/useDeleteGoalsDialogController';

import { TemplateAlertDialog } from '../TemplateAlertDialog';

import { useDeleteGoalAlertDialogController } from './useDeleteGoalAlertDialogController';

interface DeleteGoalAlertDialogProps {
  isOpen: boolean;
  selectedGoals: GoalData[];
  onClose: () => void;
}

export function DeleteGoalAlertDialog({
  isOpen,
  selectedGoals,
  onClose,
}: DeleteGoalAlertDialogProps) {
  const { handleDeleteManyGoals, isDeletingGoals } =
    useDeleteGoalAlertDialogController(selectedGoals, onClose);

  return (
    <TemplateAlertDialog
      title="Excluir meta(s)?"
      description="Essa ação não poderá ser desfeita."
      isSubmitting={isDeletingGoals}
      isOpen={isOpen}
      actionButtonLabel={`Excluir (${selectedGoals.length})`}
      onClose={onClose}
      onSubmit={handleDeleteManyGoals}
    >
      <p>As seguintes metas serão excluídas:</p>
      <ul className="list-inside list-disc">
        {selectedGoals.map((goal) => (
          <li key={`remove-goal-${goal.id}`} className="text">
            {goal.title}
          </li>
        ))}
      </ul>
    </TemplateAlertDialog>
  );
}
