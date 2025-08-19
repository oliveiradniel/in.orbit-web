import type { Summary } from '@/@types/Summary';

import type { IGoalService } from '../interfaces/IGoalService';
import type { IHttpClient } from '../interfaces/IHttpClient';

export class GoalService implements IGoalService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  getWeeklySummaryOfCompletedGoals(): Promise<Summary> {
    return this.httpClient.get<Summary>('/goals/summary');
  }
}
