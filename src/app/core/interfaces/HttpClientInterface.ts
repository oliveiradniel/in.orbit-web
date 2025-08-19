export type HttpRequestConfig = {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  signal?: AbortSignal;
};

export type HttpRequestBody = Record<string, string | number>;

export interface HttpClientInterface {
  get<ResponseType>(
    path: string,
    config?: HttpRequestConfig
  ): Promise<ResponseType>;
  post<ResponseType, BodyType = unknown>(
    path: string,
    body?: BodyType,
    config?: HttpRequestConfig
  ): Promise<ResponseType>;
}
