import { GoalCompletedService } from '../core/services/GoalCompletedService';

import { makeHttpClient } from './makeHttpClient';

export function makeGoalCompletedService() {
  return new GoalCompletedService(makeHttpClient());
}
