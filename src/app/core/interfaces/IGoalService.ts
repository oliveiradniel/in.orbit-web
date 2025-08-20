import type { GoalWithCompletionCount, Summary } from '@/@types/Summary';

import type { HttpRequestConfig } from './IHttpClient';

export interface IGoalService {
  getWeeklySummaryOfCompletedGoals(
    config?: HttpRequestConfig
  ): Promise<Summary>;
  getWeeklyGoalsWithCompletionCount(
    config?: HttpRequestConfig
  ): Promise<GoalWithCompletionCount[]>;
}
