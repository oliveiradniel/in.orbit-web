import { PlusIcon } from 'lucide-react';

import { OutlineButton } from '../ui/OutlineButton';

import { useGoalsButtonsController } from './useGoalsButtonsController';

export function GoalButtons() {
  const {
    weeklyGoalsWithCompletionCount,
    isRefetchingWeeklySummary,
    handleCreateGoalCompleted,
  } = useGoalsButtonsController();

  return (
    <div className="flex flex-wrap gap-3">
      {weeklyGoalsWithCompletionCount?.map(
        ({ id, title, desiredWeeklyFrequency, completionCount }) => {
          const isGoalCompleted = completionCount >= desiredWeeklyFrequency;

          return (
            <OutlineButton
              key={id}
              disabled={isGoalCompleted || isRefetchingWeeklySummary}
              onClick={() => handleCreateGoalCompleted(id)}
            >
              <PlusIcon aria-hidden="true" className="size-4 text-zinc-600" />{' '}
              {title}
            </OutlineButton>
          );
        }
      )}
    </div>
  );
}
