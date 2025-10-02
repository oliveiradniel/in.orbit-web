import type { GoalWithCompletionCount, Summary } from '@/@types/Summary';
import type { GoalFormData } from '@/app/schemas/CreateGoalSchema';
import type { Goal } from '@/entities/Goal';
import type { IGoalService } from '../interfaces/IGoalService';
import type { HttpRequestConfig, IHttpClient } from '../interfaces/IHttpClient';

export class GoalService implements IGoalService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  getAll(config?: HttpRequestConfig): Promise<Goal[]> {
    return this.httpClient.get<Goal[]>('/goals/all', config);
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
}
