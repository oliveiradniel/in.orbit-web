import type { HttpRequestConfig } from './IHttpClient';

export interface IGoalCompletedService {
  create(goalId: string, config?: HttpRequestConfig): Promise<void>;
}
