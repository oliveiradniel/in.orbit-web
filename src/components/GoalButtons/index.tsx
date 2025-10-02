import { PlusIcon } from 'lucide-react';

import { OutlineButton } from '../ui/OutlineButton';

import { useGoalsButtonsController } from './useGoalsButtonsController';

export function GoalButtons() {
  const {
    isRefetchingWeeklySummary,
    handleCreateGoalCompleted,
    goalsNotStarted,
    goalsStarted,
    goalsCompleted,
    hasGoalsNotStarted,
    hasGoalsStarted,
    hasGoalsCompleted,
  } = useGoalsButtonsController();

  return (
    <div className="space-y-6">
      <p className="text-xl font-medium">Metas</p>

      {hasGoalsNotStarted && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-zinc-400">Não iniciadas</p>

          <div className="flex flex-wrap gap-2">
            {goalsNotStarted?.map(
              ({ id, title, completionCount, desiredWeeklyFrequency }) => {
                const isGoalCompleted =
                  completionCount >= desiredWeeklyFrequency;

                return (
                  <OutlineButton
                    key={id}
                    disabled={isGoalCompleted || isRefetchingWeeklySummary}
                    onClick={() => handleCreateGoalCompleted(id)}
                    className="group"
                  >
                    <PlusIcon
                      aria-hidden="true"
                      className="size-4 text-red-400 transition-colors duration-300 ease-linear group-hover:text-red-500"
                    />{' '}
                    {title}
                  </OutlineButton>
                );
              }
            )}
          </div>
        </div>
      )}

      {hasGoalsStarted && (
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
                    {!wasCompletedToday && (
                      <PlusIcon
                        aria-hidden="true"
                        className="size-4 text-yellow-300 transition-colors duration-300 ease-linear group-hover:text-yellow-500"
                      />
                    )}
                    {title}
                  </OutlineButton>
                );
              }
            )}
          </div>
        </div>
      )}

      {hasGoalsCompleted && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-zinc-400">Completadas</p>

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
                    {title}
                  </OutlineButton>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}
