import type { GoalWithCompletionCount, Summary } from '@/@types/Summary';

import type { GoalFormData } from '@/app/schemas/CreateGoalSchema';

import type { HttpRequestConfig } from './IHttpClient';

export interface IGoalService {
  create(createGoalDTO: GoalFormData): Promise<void>;
  getWeeklySummaryOfCompletedGoals(
    config?: HttpRequestConfig
  ): Promise<Summary>;
  getWeeklyGoalsWithCompletionCount(
    config?: HttpRequestConfig
  ): Promise<GoalWithCompletionCount[]>;
}
