import type {
  GoalsAndTotal,
  GoalWithCompletionCount,
  Summary,
} from '@/@types/Goals';

import type { GoalFormData } from '@/app/schemas/CreateGoalSchema';

import type { HttpRequestConfig } from './IHttpClient';

export interface IGoalService {
  getAll(config?: HttpRequestConfig): Promise<GoalsAndTotal>;
  getWeeklySummaryOfCompletedGoals(
    config?: HttpRequestConfig
  ): Promise<Summary>;
  getWeeklyGoalsWithCompletionCount(
    config?: HttpRequestConfig
  ): Promise<GoalWithCompletionCount[]>;
  create(
    createGoalDTO: GoalFormData,
    config?: HttpRequestConfig
  ): Promise<void>;
}
