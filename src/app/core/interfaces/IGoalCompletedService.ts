import type { TotalQuantity } from '@/@types/GoalsCompleted';
import type { HttpRequestConfig } from './IHttpClient';

export interface IGoalCompletedService {
  totalQuantity(config?: HttpRequestConfig): Promise<TotalQuantity>;
  create(goalId: string, config?: HttpRequestConfig): Promise<void>;
}
