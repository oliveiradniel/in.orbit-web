import { Filter } from 'lucide-react';

import { useGoalContext } from '@/app/contexts/GoalContext/useGoalContext';

import { Select } from '@/view/components/ui/Select';

export function SelectGoalsFilter({ disabled }: { disabled: boolean }) {
  const { filterOptionsData, selectedTypeFilter, handleSelectTypeFilter } =
    useGoalContext();

  return (
    <Select.Root>
      <Select.Trigger disabled={disabled}>
        <span>{selectedTypeFilter.label}</span>
        <Filter className="size-4" />
      </Select.Trigger>

      <Select.Content ariaLabel="Lista de filtros para as metas">
        <Select.Viewport>
          {filterOptionsData.map((option) => (
            <Select.Item
              key={option.id}
              value={option.typeFilter}
              text={option.label}
              selectedValue={selectedTypeFilter.typeFilter}
              disabled={option.disabled}
              onSelect={() => handleSelectTypeFilter(option.typeFilter)}
            />
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
