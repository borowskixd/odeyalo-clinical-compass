import { api } from "../../api";
import {
  type YandexAuthApiResponse,
  type YandexLoginRedirect,
} from "@/shared/types";

const yandexApi = api.injectEndpoints({
  endpoints: (builder) => ({
    yandexLogin: builder.query<YandexLoginRedirect, void>({
      query: () => ({
        url: "/auth_yandex/callback/yandexLogin",
        method: "GET",
      }),
    }),
    yandexExchangeCode: builder.query<YandexAuthApiResponse, string>({
      query: (code) => ({
        url: "/auth_yandex/callback/yandexCallback",
        method: "GET",
        params: { code },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useYandexLoginQuery, useLazyYandexExchangeCodeQuery } =
  yandexApi;
