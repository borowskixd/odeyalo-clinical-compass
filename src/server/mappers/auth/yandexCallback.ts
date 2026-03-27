import {
  type YandexCallbackApiResponseData,
  type YandexCallbackResponseData,
} from "@/shared/types";

export const mapYandexCallbackResponse = (
  data: YandexCallbackApiResponseData,
): YandexCallbackResponseData => {
  const { access_token, refresh_token } = data;

  return {
    accessToken: access_token,
    refreshToken: refresh_token,
  };
};
