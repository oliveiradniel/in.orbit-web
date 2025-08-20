import { useQueryClient } from '@tanstack/react-query';

import { PlusIcon } from 'lucide-react';

import { useCreateGoalCompletedMutation } from '@/app/hooks/mutations/useCreateGoalCompletedMutation';
import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';
import { useGetWeeklySummaryOfCompletedGoalsQuery } from '@/app/hooks/queries/useGetWeeklySummaryOfCompletedGoalsQuery';

import { OutlineButton } from './ui/OutlineButton';

export function GoalButtons() {
  const queryClient = useQueryClient();

  const { weeklyGoalsWithCompletionCount } =
    useGetWeeklyGoalsWithCompletionCountQuery();

  const { isRefetchingWeeklySummary } =
    useGetWeeklySummaryOfCompletedGoalsQuery();

  const { createGoalCompleted } = useCreateGoalCompletedMutation();

  async function handleCreateGoalCompleted(goalId: string) {
    await createGoalCompleted(goalId);

    queryClient.invalidateQueries({ queryKey: ['weeklySummary'] });
    queryClient.invalidateQueries({ queryKey: ['weeklyGoals'] });
  }

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
