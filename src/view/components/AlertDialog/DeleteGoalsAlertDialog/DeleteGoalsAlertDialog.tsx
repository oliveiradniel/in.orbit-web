import { AlertDialog } from '@/view/components/Templates/AlertDialog';

import type { DeleteGoalsAlertDialogProps } from '../types';

import { useDeleteGoalsAlertDialogController } from './useDeleteGoalsAlertDialogController';

export function DeleteGoalsAlertDialog({
  isOpen,
  selectedGoals,
  onClose,
}: DeleteGoalsAlertDialogProps) {
  const { handleDeleteManyGoals, isDeletingGoals } =
    useDeleteGoalsAlertDialogController(selectedGoals, onClose);

  return (
    <AlertDialog
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
    </AlertDialog>
  );
}
