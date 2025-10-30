import { Plus, Trash2 } from 'lucide-react';

import { DeleteGoalsAlertDialog } from '../DeleteGoalsAlertDialog';

import { useDeleteGoalsAlertDialogController } from '../DeleteGoalsAlertDialog/useDeleteGoalsAlertDialogController';

import { DialogTemplate } from '../TemplateDialog';
import { Button } from '../ui/Button';
import { CheckboxIndicator, CheckboxItem } from '../ui/Checkbox';

import {
  type DeleteGoalsDialogProps,
  useDeleteGoalsDialogController,
} from './useDeleteGoalsDialogController';

export function DeleteGoalsDialog({
  isOpen,
  onClose,
  selectedGoals,
  isDeleteButtonDisabled,
  toggleCheckboxGoalId,
  onOpenNewGoalDialog,
}: DeleteGoalsDialogProps) {
  const { goals, totalActiveGoals, hasActiveGoals } =
    useDeleteGoalsDialogController();

  const {
    isDeleteGoalsAlertDialogOpen,
    handleOpenDeleteGoalAlert,
    handleCloseDeleteGoalAlert,
  } = useDeleteGoalsAlertDialogController();

  return (
    <>
      <DeleteGoalsAlertDialog
        isOpen={isDeleteGoalsAlertDialogOpen}
        selectedGoals={selectedGoals}
        onClose={handleCloseDeleteGoalAlert}
      />

      <DialogTemplate
        hasAction={false}
        title="Gerencie suas metas"
        description="Exclua metas que não fazem mais sentido pra você"
        isOpen={isOpen}
        onClose={onClose}
      >
        {hasActiveGoals && (
          <div className="flex h-full flex-col gap-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                disabled={isDeleteButtonDisabled}
                onClick={handleOpenDeleteGoalAlert}
                className="group rounded-sm border border-red-400 bg-black p-2 ring-red-500/10 transition-colors duration-300 ease-linear outline-none focus-visible:border-red-500 focus-visible:ring-4 enabled:cursor-pointer enabled:hover:border-red-500 disabled:border-zinc-900"
              >
                <Trash2 className="size-4 text-red-400 transition-colors duration-300 ease-linear group-focus-visible:text-red-500 group-enabled:group-hover:text-red-500 group-disabled:text-zinc-500" />
              </button>

              <p className="text-sm text-zinc-400">
                Total de metas:{' '}
                <span className="font-bold">{totalActiveGoals}</span>
              </p>
            </div>

            <ul className="scrollbar-custom flex-1 space-y-2 overflow-y-auto transition-all duration-300 ease-linear">
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

                      <span className="text-end">{title}</span>
                    </CheckboxItem>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}

        {!hasActiveGoals && (
          <div className="space-y-4">
            <p className="text-zinc-400">
              Não há nenhuma meta ativa, cadastre uma nova para poder gerenciar.
            </p>
            <Button
              type="button"
              size="sm"
              onClick={onOpenNewGoalDialog}
              className="w-full"
            >
              <Plus className="size-4" />
              Cadastrar meta
            </Button>
          </div>
        )}
      </DialogTemplate>
    </>
  );
}
