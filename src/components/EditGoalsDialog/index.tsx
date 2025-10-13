import { Trash2 } from 'lucide-react';

import { DeleteGoalAlertDialog } from '../DeleteGoalAlertDialog';
import { useDeleteGoalAlertDialogController } from '../DeleteGoalAlertDialog/useDeleteGoalAlertDialogController';
import { DialogTemplate } from '../TemplateDialog';
import { CheckboxIndicator, CheckboxItem } from '../ui/Checkbox';

import {
  type EditGoalsDialogProps,
  useEditGoalsDialogController,
} from './useEditGoalsDialogController';

export function EditGoalsDialog({
  isOpen,
  onClose,
  selectedGoals,
  isDeleteButtonDisabled,
  toggleCheckboxGoalId,
  onDeleteManyGoals,
}: EditGoalsDialogProps) {
  const { goals, totalOfGoals } = useEditGoalsDialogController();

  const {
    isDeleteGoalAlertDialogOpen,
    handleOpenEditGoalsDialog,
    handleCloseEditGoalsDialog,
  } = useDeleteGoalAlertDialogController();

  function handleDelete() {
    onDeleteManyGoals();
    onClose();
  }

  return (
    <>
      <DeleteGoalAlertDialog
        isOpen={isDeleteGoalAlertDialogOpen}
        selectedGoals={selectedGoals}
        onClose={handleCloseEditGoalsDialog}
        onConfirm={handleDelete}
      />

      <DialogTemplate
        title="Edite suas metas"
        description="Edite o título ou exclua algumas de suas metas"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              disabled={isDeleteButtonDisabled}
              onClick={handleOpenEditGoalsDialog}
              className="group rounded-sm border border-red-400 bg-black p-2 ring-red-500/10 transition-colors duration-300 ease-linear outline-none focus-visible:border-red-500 focus-visible:ring-4 enabled:cursor-pointer enabled:hover:border-red-500 disabled:border-zinc-900"
            >
              <Trash2 className="size-4 text-red-400 transition-colors duration-300 ease-linear group-focus-visible:text-red-500 group-enabled:group-hover:text-red-500 group-disabled:text-zinc-500" />
            </button>

            <p className="text-sm text-zinc-400">
              Total de metas: {totalOfGoals}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {goals.map(({ id, title }) => (
              <div key={`list-goals-${id}`} className="flex flex-col gap-2">
                <div className="flex w-full gap-2">
                  <CheckboxItem
                    id={`goal-${id}`}
                    onCheckedChange={(isChecked) =>
                      toggleCheckboxGoalId(isChecked, { id: id!, title })
                    }
                  >
                    <CheckboxIndicator />

                    <span>{title}</span>
                  </CheckboxItem>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogTemplate>
    </>
  );
}
