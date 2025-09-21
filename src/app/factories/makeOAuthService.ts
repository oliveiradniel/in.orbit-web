import { OAuthService } from '../core/services/OAuthService';

import { makeHttpClient } from './makeHttpClient';

export function makeOAuthService() {
  return new OAuthService(makeHttpClient());
}
