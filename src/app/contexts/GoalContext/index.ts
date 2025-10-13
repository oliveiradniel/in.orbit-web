import { createContext } from 'react';
import type { Goal } from '@/entities/Goal';

interface GoalContextValue {
  goals: Goal[];
  totalActiveGoals: number;
  activeGoals: Goal[];
  inactiveGoals: Goal[];
  haveAnyGoal: boolean;
  isSeekingAllGoals: boolean;
}

export const GoalContext = createContext({} as GoalContextValue);
