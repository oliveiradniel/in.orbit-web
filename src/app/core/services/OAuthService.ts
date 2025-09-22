import type { OAuthGitHubResponse } from '@/@types/OAuthGitHubResponse';

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
  ): Promise<OAuthGitHubResponse> {
    return this.httpClient.post('/oauth/github', { code }, config);
  }
}
