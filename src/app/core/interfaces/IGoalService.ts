import type { GoalWithCompletionCount, Summary } from '@/@types/Summary';

import type { GoalFormData } from '@/app/schemas/CreateGoalSchema';
import type { Goal } from '@/entities/Goal';

import type { HttpRequestConfig } from './IHttpClient';

export interface IGoalService {
  getAll(config?: HttpRequestConfig): Promise<Goal[]>;
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
