import type { HttpRequestConfig } from './IHttpClient';

export interface IOAuthService {
  githubLogin(
    code: string,
    config?: HttpRequestConfig
  ): Promise<{ accessToken: string }>;
}
