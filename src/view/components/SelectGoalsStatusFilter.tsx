import { Filter } from 'lucide-react';

import { useGoalContext } from '@/app/contexts/GoalContext/useGoalContext';

import { Select } from '@/view/components/ui/Select';

export function SelectGoalsStatusFilter({ disabled }: { disabled: boolean }) {
  const {
    goalStatusData,
    selectedGoalStatusFilter,
    handleSelectGoalStatusFilter,
  } = useGoalContext();

  return (
    <Select.Root>
      <Select.Trigger disabled={disabled}>
        <span>{selectedGoalStatusFilter.label}</span>
        <Filter className="size-4" />
      </Select.Trigger>

      <Select.Content ariaLabel="Lista de filtros para as metas">
        <Select.Viewport>
          {goalStatusData.map((option) => (
            <Select.Item
              key={option.id}
              value={option.status}
              text={option.label}
              disabled={option.disabled}
              selectedValue={selectedGoalStatusFilter.status}
              onSelect={() => handleSelectGoalStatusFilter(option.status)}
            />
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
