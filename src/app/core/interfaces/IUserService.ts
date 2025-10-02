import type { GamificationInfo } from '@/@types/GamificationInfo';

import type { UserResponse } from '@/@types/UserResponse';

import type { HttpRequestConfig } from './IHttpClient';

export interface IUserService {
  me(config?: HttpRequestConfig): Promise<UserResponse>;
  getUserLevelAndExperience(
    config?: HttpRequestConfig
  ): Promise<GamificationInfo>;
}
