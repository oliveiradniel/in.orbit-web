import axios, { type AxiosInstance } from 'axios';

import { env } from '@/config/env';

import type { HttpRequestConfig, IHttpClient } from '../interfaces/IHttpClient';

export class HttpClient implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.API_URL,
    });
  }

  async get<ResponseType>(
    path: string,
    config?: HttpRequestConfig
  ): Promise<ResponseType> {
    const response = await this.axiosInstance.get<ResponseType>(path, config);

    return response.data;
  }

  async post<ResponseType, BodyType = unknown>(
    path: string,
    body: BodyType,
    config?: HttpRequestConfig
  ): Promise<ResponseType> {
    const response = await this.axiosInstance.post<ResponseType>(
      path,
      body,
      config
    );

    return response.data;
  }
}
