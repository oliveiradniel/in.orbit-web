import { useContext } from 'react';
import { GoalContext } from '.';

export function useGoalContext() {
  return useContext(GoalContext);
}
