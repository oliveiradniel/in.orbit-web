import { createContext } from 'react';

import type { Goal } from '@/entities/Goal';
import type { FilterOptionsData, TypeFilter } from './GoalProvider';

interface GoalContextValue {
  goals: Goal[];
  totalActiveGoals: number;
  activeGoals: Goal[];
  inactiveGoals: Goal[];
  hasAnyGoal: boolean;
  hasAnyActiveGoal: boolean;
  isSeekingAllGoals: boolean;
  filterOptionsData: FilterOptionsData[];
  selectedTypeFilter: FilterOptionsData;
  handleSelectTypeFilter: (typeFilter: TypeFilter) => void;
}

export const GoalContext = createContext({} as GoalContextValue);
