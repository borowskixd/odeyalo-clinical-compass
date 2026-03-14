export interface YandexAuthApiResponse {
  access_token: string;
  refresh_token: string;
}

export interface YandexAuthResponse {
  accessToken: string;
  refreshToken: string;
}

export type YandexCallbackHandler = (
  code: string,
) => Promise<YandexAuthResponse>;
