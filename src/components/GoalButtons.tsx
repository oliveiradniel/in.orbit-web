import { PlusIcon } from 'lucide-react';

import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';

import { OutlineButton } from './ui/OutlineButton';

export function GoalButtons() {
  const { weeklyGoalsWithCompletionCount } =
    useGetWeeklyGoalsWithCompletionCountQuery();

  return (
    <div className="flex flex-wrap gap-3">
      {weeklyGoalsWithCompletionCount?.map(
        ({ id, title, desiredWeeklyFrequency, completionCount }) => {
          const isButtonDisabled = completionCount >= desiredWeeklyFrequency;

          return (
            <OutlineButton key={id} disabled={isButtonDisabled}>
              <PlusIcon aria-hidden="true" className="size-4 text-zinc-600" />{' '}
              {title}
            </OutlineButton>
          );
        }
      )}
    </div>
  );
}
