import type { Summary } from '@/@types/Summary';

import type { HttpRequestConfig } from './IHttpClient';

export interface IGoalService {
  getWeeklySummaryOfCompletedGoals(
    path: string,
    config?: HttpRequestConfig
  ): Promise<Summary>;
}
