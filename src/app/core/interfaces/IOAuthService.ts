import type { OAuthGitHubResponse } from '@/@types/OAuthGitHubResponse';

import type { HttpRequestConfig } from './IHttpClient';

export interface IOAuthService {
  githubLogin(
    code: string,
    config?: HttpRequestConfig
  ): Promise<OAuthGitHubResponse>;
  logout(config?: HttpRequestConfig): Promise<void>;
}
