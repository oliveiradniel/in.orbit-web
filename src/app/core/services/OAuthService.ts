import type { AccessTokenResponse } from '@/@types/AccessTokenResponse';

import type { HttpRequestConfig, IHttpClient } from '../interfaces/IHttpClient';
import type { IOAuthService } from '../interfaces/IOAuthService';

export class OAuthService implements IOAuthService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  githubLogin(
    code: string,
    config?: HttpRequestConfig
  ): Promise<AccessTokenResponse> {
    return this.httpClient.post('/oauth/github', { code }, config);
  }
}
