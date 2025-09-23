import type { UserResponse } from '@/@types/UserResponse';

import type { IHttpClient } from '../interfaces/IHttpClient';
import type { IUserService } from '../interfaces/IUserService';

export class UserService implements IUserService {
  httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  me(): Promise<UserResponse> {
    return this.httpClient.get('/users');
  }
}
