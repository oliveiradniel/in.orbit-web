import type {
  GoalsAndTotal,
  GoalWithCompletionCount,
  Summary,
} from '@/@types/Goals';
import type { GoalFormData } from '@/app/schemas/CreateGoalSchema';

import type { IGoalService } from '../interfaces/IGoalService';

import type { HttpRequestConfig, IHttpClient } from '../interfaces/IHttpClient';

export class GoalService implements IGoalService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  getAll(config?: HttpRequestConfig): Promise<GoalsAndTotal> {
    return this.httpClient.get<GoalsAndTotal>('/goals/all', config);
  }

  getWeeklyGoalsWithCompletionCount(
    config?: HttpRequestConfig
  ): Promise<GoalWithCompletionCount[]> {
    return this.httpClient.get<GoalWithCompletionCount[]>('/goals', config);
  }

  getWeeklySummaryOfCompletedGoals(
    config?: HttpRequestConfig
  ): Promise<Summary> {
    return this.httpClient.get<Summary>('/goals/summary', config);
  }

  create(
    createGoalDTO: GoalFormData,
    config?: HttpRequestConfig
  ): Promise<void> {
    return this.httpClient.post('/goals', createGoalDTO, config);
  }

  deleteMany(goalsId: string[], config?: HttpRequestConfig): Promise<void> {
    return this.httpClient.delete('/goals', goalsId, config);
  }
}
