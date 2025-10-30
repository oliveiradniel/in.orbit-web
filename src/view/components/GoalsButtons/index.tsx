import { PlusIcon } from 'lucide-react';

import { useGoalContext } from '@/app/contexts/GoalContext/useGoalContext';

import { SelectGoalsFilter } from '../SelectGoalsFilter';
import { SelectGoalsStatusFilter } from '../SelectGoalsStatusFilter';
import { Button } from '../ui/Button';
import { OutlineButton } from '../ui/OutlineButton';
import { Spinner } from '../ui/Spinner';

import { useGoalsButtonsController } from './useGoalsButtonsController';

export function GoalsButtons() {
  const { selectedTypeFilter } = useGoalContext();

  const {
    isRefetchingWeeklySummary,
    status,
    goalsInactive,
    goalsNotStarted,
    goalsStarted,
    goalsCompleted,
    shouldShowNotStartedGoals,
    shouldShowStartedGoals,
    shouldShowCompletedGoals,
    shouldShowInactiveGoals,
    isLoadingWeeklyGoals,
    hasErrorWeeklyGoals,
    handleCreateGoalCompleted,
    refetchWeeklyGoals,
    isCreatingGoalCompleted,
    updatingGoalId,
  } = useGoalsButtonsController(selectedTypeFilter.typeFilter);

  return (
    <div className="space-y-6">
      {hasErrorWeeklyGoals && !isLoadingWeeklyGoals && (
        <div className="space-y-4">
          <p className="text-zinc-400">
            Não foi possível buscar as metas da semana.
          </p>

          <Button
            aria-live="polite"
            type="button"
            variant="danger"
            onClick={() => refetchWeeklyGoals()}
          >
            Tentar novamente.
          </Button>
        </div>
      )}

      {!hasErrorWeeklyGoals && (
        <>
          <div className="flex items-center justify-between gap-4">
            <p className="text-xl font-medium">
              {isLoadingWeeklyGoals
                ? 'Carregando...'
                : selectedTypeFilter.label}
            </p>

            <div className="flex gap-2">
              <SelectGoalsStatusFilter disabled={isLoadingWeeklyGoals} />
              <SelectGoalsFilter
                disabled={status === 'inactive' || isLoadingWeeklyGoals}
              />
            </div>
          </div>

          {shouldShowNotStartedGoals && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-zinc-400">Não iniciadas</p>

              <div className="flex flex-wrap gap-2">
                {goalsNotStarted?.map(
                  ({
                    id,
                    title,
                    completionCount,
                    desiredWeeklyFrequency,
                    isDeleted,
                  }) => {
                    const isGoalCompleted =
                      completionCount >= desiredWeeklyFrequency;

                    return (
                      <OutlineButton
                        key={id}
                        disabled={isGoalCompleted || isRefetchingWeeklySummary}
                        onClick={() => handleCreateGoalCompleted(id)}
                        status="notStarted"
                        className="group"
                      >
                        {!isDeleted && !isCreatingGoalCompleted && (
                          <PlusIcon
                            aria-hidden="true"
                            className="size-4 text-red-400 transition-colors duration-300 ease-linear group-hover:text-red-500"
                          />
                        )}

                        {isCreatingGoalCompleted && id === updatingGoalId && (
                          <Spinner className="size-4 border-red-400" />
                        )}

                        <p>
                          {title}{' '}
                          <span className="ml-2 text-xs font-semibold text-red-400">
                            {completionCount}/{desiredWeeklyFrequency}
                          </span>
                        </p>
                      </OutlineButton>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {shouldShowStartedGoals && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-zinc-400">Iniciadas</p>

              <div className="flex flex-wrap gap-2">
                {goalsStarted?.map(
                  ({
                    id,
                    title,
                    completionCount,
                    desiredWeeklyFrequency,
                    wasCompletedToday,
                    isDeleted,
                  }) => {
                    const isGoalCompleted =
                      completionCount >= desiredWeeklyFrequency;

                    return (
                      <OutlineButton
                        key={id}
                        disabled={
                          isGoalCompleted ||
                          isRefetchingWeeklySummary ||
                          wasCompletedToday
                        }
                        onClick={() => handleCreateGoalCompleted(id)}
                        status="started"
                        className="group"
                      >
                        {!wasCompletedToday &&
                          !isDeleted &&
                          !isCreatingGoalCompleted && (
                            <PlusIcon
                              aria-hidden="true"
                              className="size-4 text-yellow-300 transition-colors duration-300 ease-linear group-hover:text-yellow-500"
                            />
                          )}

                        {isCreatingGoalCompleted && id === updatingGoalId && (
                          <Spinner className="size-4 border-yellow-400" />
                        )}

                        <p>
                          {title}{' '}
                          <span className="ml-2 text-xs font-semibold text-yellow-400">
                            {completionCount}/{desiredWeeklyFrequency}
                          </span>
                        </p>
                      </OutlineButton>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {shouldShowCompletedGoals && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-zinc-400">Concluídas</p>

              <div className="flex flex-wrap gap-2">
                {goalsCompleted?.map(
                  ({ id, title, completionCount, desiredWeeklyFrequency }) => {
                    const isGoalCompleted =
                      completionCount >= desiredWeeklyFrequency;

                    return (
                      <OutlineButton
                        key={id}
                        disabled={isGoalCompleted || isRefetchingWeeklySummary}
                        status="completed"
                      >
                        <p>
                          {title}{' '}
                          <span className="ml-2 text-xs font-semibold text-green-500">
                            {completionCount}/{desiredWeeklyFrequency}
                          </span>
                        </p>
                      </OutlineButton>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {shouldShowInactiveGoals && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-zinc-400">Inativas</p>

              <div className="flex flex-wrap gap-2">
                {goalsInactive?.map(({ id, title }) => {
                  return (
                    <OutlineButton key={id} disabled>
                      <p>{title}</p>
                    </OutlineButton>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
