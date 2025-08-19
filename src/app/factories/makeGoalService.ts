import { GoalService } from '../core/services/GoalService';

import { makeHttpClient } from './makeHttpClient';

export function makeGoalService() {
  return new GoalService(makeHttpClient());
}
