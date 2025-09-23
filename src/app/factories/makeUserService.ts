import { UserService } from '../core/services/UserService';

import { makeHttpClient } from './makeHttpClient';

export function makeUserService() {
  return new UserService(makeHttpClient());
}
