import type { GoalData } from '../DeleteGoalsDialog/useDeleteGoalsDialogController';

import { TemplateAlertDialog } from '../TemplateAlertDialog';

import { useDeleteGoalsAlertDialogController } from './useDeleteGoalsAlertDialogController';

interface DeleteGoalsAlertDialogProps {
  isOpen: boolean;
  selectedGoals: GoalData[];
  onClose: () => void;
}

export function DeleteGoalsAlertDialog({
  isOpen,
  selectedGoals,
  onClose,
}: DeleteGoalsAlertDialogProps) {
  const { handleDeleteManyGoals, isDeletingGoals } =
    useDeleteGoalsAlertDialogController(selectedGoals, onClose);

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
