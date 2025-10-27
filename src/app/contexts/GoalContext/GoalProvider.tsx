import { useId, useState } from 'react';
import { useGetAllGoalsQuery } from '@/app/hooks/queries/useGetAllGoalsQuery';
import { useGetWeeklyGoalsWithCompletionCountQuery } from '@/app/hooks/queries/useGetWeeklyGoalsWithCompletionCountQuery';

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
  disabled: boolean;
};

export type FilterOptionsData = {
  id: string;
  typeFilter: TypeFilter;
  label: string;
  disabled: boolean;
};

export type GoalStatusFilter = 'active' | 'inactive';

interface GoalProviderProps {
  children: React.ReactNode;
}

export function GoalProvider({ children }: GoalProviderProps) {
  const { goals, totalActiveGoals, isSeekingAllGoals } = useGetAllGoalsQuery();

  const { weeklyGoalsWithCompletionCount } =
    useGetWeeklyGoalsWithCompletionCountQuery();

  const isNotStartedGoalsDisabled =
    weeklyGoalsWithCompletionCount?.filter(
      (goal) => goal.status === 'not started' && goal.isDeleted === false
    ).length === 0;

  const isStartedGoalsDisabled =
    weeklyGoalsWithCompletionCount?.filter(
      (goal) => goal.status === 'started' && goal.isDeleted === false
    ).length === 0;

  const isCompletedGoalsDisabled =
    weeklyGoalsWithCompletionCount?.filter(
      (goal) => goal.status === 'completed' && goal.isDeleted === false
    ).length === 0;

  const isInactiveGoalsDisabled =
    weeklyGoalsWithCompletionCount?.filter((goal) => goal.isDeleted === true)
      .length === 0;

  const activeGoals = goals.filter((goal) => goal.isDeleted === false);
  const inactiveGoals = goals.filter((goal) => goal.isDeleted === true);

  const hasAnyGoal = goals.length > 0;
  const hasAnyActiveGoal = activeGoals.length > 0;

  const goalStatusData: GoalStatusData[] = [
    {
      id: useId(),
      status: 'active',
      label: 'Metas ativas',
      disabled: false,
    },
    {
      id: useId(),
      status: 'inactive',
      label: 'Metas inativas',
      disabled: isInactiveGoalsDisabled,
    },
  ];

  const filterOptionsData: FilterOptionsData[] = [
    {
      id: useId(),
      typeFilter: 'all-goals',
      label: 'Todas as metas',
      disabled: false,
    },
    {
      id: useId(),
      typeFilter: 'not-started-goals',
      label: 'Metas não iniciadas',
      disabled: isNotStartedGoalsDisabled,
    },
    {
      id: useId(),
      typeFilter: 'started-goals',
      label: 'Metas iniciadas',
      disabled: isStartedGoalsDisabled,
    },
    {
      id: useId(),
      typeFilter: 'completed-goals',
      label: 'Metas concluídas',
      disabled: isCompletedGoalsDisabled,
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
