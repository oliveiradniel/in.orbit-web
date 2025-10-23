import type { TotalQuantity } from '@/@types/GoalsCompleted';
import type { IGoalCompletedService } from '../interfaces/IGoalCompletedService';
import type { HttpRequestConfig, IHttpClient } from '../interfaces/IHttpClient';

export class GoalCompletedService implements IGoalCompletedService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  totalQuantity(config?: HttpRequestConfig): Promise<TotalQuantity> {
    return this.httpClient.get('/goals-completed/total-quantity', config);
  }

  create(goalId: string, config?: HttpRequestConfig): Promise<void> {
    return this.httpClient.post('/goals-completed', { goalId }, config);
  }
}
