import { HttpClient } from '../core/infra/HttpClient';

export function makeHttpClient() {
  return new HttpClient();
}
