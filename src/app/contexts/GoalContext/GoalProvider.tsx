import { useId, useState } from 'react';
import { useGetAllGoalsQuery } from '@/app/hooks/queries/useGetAllGoalsQuery';

import { GoalContext } from '.';

export type TypeFilter =
  | 'all-goals'
  | 'active-goals'
  | 'not-started-goals'
  | 'started-goals'
  | 'completed-goals';

export type GoalStatusData = {
  id: string;
  status: GoalStatusFilter;
  label: string;
};

export type FilterOptionsData = {
  id: string;
  typeFilter: TypeFilter;
  label: string;
};

export type GoalStatusFilter = 'active' | 'inactive';

interface GoalProviderProps {
  children: React.ReactNode;
}

export function GoalProvider({ children }: GoalProviderProps) {
  const { goals, totalActiveGoals, isSeekingAllGoals } = useGetAllGoalsQuery();

  const activeGoals = goals.filter((goal) => goal.isDeleted === false);
  const inactiveGoals = goals.filter((goal) => goal.isDeleted === true);

  const hasAnyGoal = goals.length > 0;
  const hasAnyActiveGoal = activeGoals.length > 0;

  const goalStatusData: GoalStatusData[] = [
    {
      id: useId(),
      status: 'active',
      label: 'Metas ativas',
    },
    {
      id: useId(),
      status: 'inactive',
      label: 'Metas inativas',
    },
  ];

  const filterOptionsData: FilterOptionsData[] = [
    {
      id: useId(),
      typeFilter: 'all-goals',
      label: 'Todas as metas',
    },
    {
      id: useId(),
      typeFilter: 'not-started-goals',
      label: 'Metas não iniciadas',
    },
    {
      id: useId(),
      typeFilter: 'started-goals',
      label: 'Metas iniciadas',
    },
    {
      id: useId(),
      typeFilter: 'completed-goals',
      label: 'Metas concluídas',
    },
  ];

  const [selectedGoalStatusFilter, setSelectedGoalStatusFilter] =
    useState<GoalStatusData>(goalStatusData[0]);

  function handleSelectGoalStatusFilter(status: GoalStatusFilter) {
    const option =
      goalStatusData.find((statusData) => statusData.status === status) ??
      goalStatusData[0];

    setSelectedGoalStatusFilter(option);
  }

  const [selectedTypeFilter, setSelectedTypeFilter] =
    useState<FilterOptionsData>(filterOptionsData[0]);

  function handleSelectTypeFilter(typeFilter: TypeFilter) {
    const option =
      filterOptionsData.find(
        (filterData) => filterData.typeFilter === typeFilter
      ) ?? filterOptionsData[0];

    setSelectedTypeFilter(option);
  }

  return (
    <GoalContext.Provider
      value={{
        goals,
        totalActiveGoals,
        activeGoals,
        inactiveGoals,
        hasAnyGoal,
        hasAnyActiveGoal,
        isSeekingAllGoals,
        goalStatusData,
        filterOptionsData,
        selectedGoalStatusFilter,
        selectedTypeFilter,
        handleSelectGoalStatusFilter,
        handleSelectTypeFilter,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}
