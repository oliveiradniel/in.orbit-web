import { X } from 'lucide-react';

import type { GoalData } from '../EditGoalsDialog/useEditGoalsDialogController';

import { AlertDialog } from '../ui/AlertDialog';
import { Button } from '../ui/Button';

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
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose?.()}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay />

        <AlertDialog.Content className="data-[state=open]:animate-alert-dialog-content-open data-[state=closed]:animate-alert-dialog-content-close">
          <div className="flex h-full flex-col gap-6">
            <header className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <AlertDialog.Title className="text-red-400">
                  Excluir meta(s)?
                </AlertDialog.Title>

                <AlertDialog.Cancel asChild>
                  <button
                    aria-label="Fechar"
                    type="button"
                    className="cursor-pointer"
                  >
                    <X
                      aria-hidden="true"
                      className="size-5 text-zinc-600 transition-colors duration-300 ease-linear hover:text-zinc-700"
                    />
                  </button>
                </AlertDialog.Cancel>
              </div>

              <AlertDialog.Description>
                Essa ação não poderá ser desfeita.
              </AlertDialog.Description>
            </header>

            <p>As seguintes metas serão excluídas:</p>
            <ul className="list-inside list-disc">
              {selectedGoals.map((goal) => (
                <li key={`remove-goal-${goal.id}`} className="text">
                  {goal.title}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <AlertDialog.Cancel asChild>
                <Button
                  aria-label="Fechar"
                  type="button"
                  variant="secondary"
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </AlertDialog.Cancel>
              <Button
                type="button"
                variant="danger"
                isLoading={isDeletingGoals}
                onClick={handleDeleteManyGoals}
                className="flex-1"
              >
                Excluir ({selectedGoals.length})
              </Button>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
