import {
  type YandexAuthApiResponse,
  type YandexAuthResponse,
} from "@/shared/types";

export const mapYandexAuthResponse = (
  data: YandexAuthApiResponse,
): YandexAuthResponse => {
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
};
