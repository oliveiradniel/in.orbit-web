import { createContext } from 'react';

import type { Goal } from '@/entities/Goal';
import type {
  FilterOptionsData,
  GoalStatusData,
  GoalStatusFilter,
  TypeFilter,
} from './GoalProvider';

interface GoalContextValue {
  goals: Goal[];
  totalActiveGoals: number;
  activeGoals: Goal[];
  inactiveGoals: Goal[];
  hasGoals: boolean;
  hasActiveGoals: boolean;
  isLoadingAllGoals: boolean;
  goalStatusData: GoalStatusData[];
  filterOptionsData: FilterOptionsData[];
  selectedGoalStatusFilter: GoalStatusData;
  selectedTypeFilter: FilterOptionsData;
  hasErrorAllGoals: boolean;
  handleSelectGoalStatusFilter: (status: GoalStatusFilter) => void;
  handleSelectTypeFilter: (typeFilter: TypeFilter) => void;
}

export const GoalContext = createContext({} as GoalContextValue);
