import { Filter } from 'lucide-react';

import { useGoalContext } from '@/app/contexts/GoalContext/useGoalContext';

import { Select } from '@/view/components/ui/Select';

export function SelectGoalsFilter() {
  const { filterOptionsData, selectedTypeFilter, handleSelectTypeFilter } =
    useGoalContext();

  return (
    <Select.Root>
      <Select.Trigger>
        <span>Selecione um filtro</span>
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
              onSelect={() => handleSelectTypeFilter(option.typeFilter)}
            />
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  );
}
