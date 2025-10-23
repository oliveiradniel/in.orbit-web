import type { GamificationInfo } from '@/@types/GamificationInfo';
import type { UserResponse } from '@/@types/UserResponse';

import type { HttpRequestConfig, IHttpClient } from '../interfaces/IHttpClient';

import type { IUserService } from '../interfaces/IUserService';

export class UserService implements IUserService {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  me(config?: HttpRequestConfig): Promise<UserResponse> {
    return this.httpClient.get('/users', config);
  }

  getUserLevelAndExperience(
    config?: HttpRequestConfig
  ): Promise<GamificationInfo> {
    return this.httpClient.get('/users/gamification', config);
  }

  deleteAccount(config?: HttpRequestConfig): Promise<void> {
    return this.httpClient.delete('/users', config);
  }
}
