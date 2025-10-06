import axios, { type AxiosInstance } from 'axios';

import { env } from '@/config/env';

import type { HttpRequestConfig, IHttpClient } from '../interfaces/IHttpClient';

export class HttpClient implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: env.API_URL,
      withCredentials: true,
    });
  }

  async get<ResponseType>(
    path: string,
    config?: HttpRequestConfig
  ): Promise<ResponseType> {
    const response = await this.axiosInstance.get<ResponseType>(path, {
      ...config,
      withCredentials: true,
    });

    return response.data;
  }

  async post<ResponseType, BodyType = unknown>(
    path: string,
    body: BodyType,
    config?: HttpRequestConfig
  ): Promise<ResponseType> {
    const response = await this.axiosInstance.post<ResponseType>(path, body, {
      ...config,
      withCredentials: true,
    });

    return response.data;
  }

  async delete<BodyType = unknown>(
    path: string,
    body: BodyType,
    config?: HttpRequestConfig
  ): Promise<void> {
    await this.axiosInstance.delete<ResponseType>(path, {
      ...config,
      data: body,
    });
  }
}
