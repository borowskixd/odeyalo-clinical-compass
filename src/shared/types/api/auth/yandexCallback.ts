export interface YandexCallbackApiResponseData {
  access_token: string;
  refresh_token: string;
}

export interface YandexCallbackResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface YandexCallbackApiRequestData {
  code: string;
}

export type YandexCallbackRequestData = YandexCallbackApiRequestData;
