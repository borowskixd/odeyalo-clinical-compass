import { mapBurnoutCalculateResponse } from "@/server/mappers/auth/burnoutCalculate";
import { api } from "../../api";
import {
  type ChangePasswordRequestData,
  type LoginRequestData,
  type RegistrationRequestData,
  type RegistrationResponseData,
  type ResetPasswordRequestData,
  type ResponseSuccessInfo,
  type GetBurnoutCalculateResponseData,
  GetBurnoutCalculateApiResponseData,
} from "@/shared/types";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ResponseSuccessInfo, LoginRequestData>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    registration: builder.mutation<
      RegistrationResponseData,
      RegistrationRequestData
    >({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<ResponseSuccessInfo, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),

    resetPassword: builder.mutation<
      ResponseSuccessInfo,
      ResetPasswordRequestData
    >({
      query: (body) => ({
        url: "/auth/password/reset",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation<
      ResponseSuccessInfo,
      ChangePasswordRequestData
    >({
      query: (body) => ({
        url: "/auth/password/change",
        method: "POST",
        body,
      }),
    }),

    getBurnoutCalculate: builder.query<GetBurnoutCalculateResponseData, void>({
      query: () => ({
        url: "/auth/burnout_calculate/",
        method: "GET",
      }),
      transformResponse: (response: GetBurnoutCalculateApiResponseData) => {
        return mapBurnoutCalculateResponse(response);
      },
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetBurnoutCalculateQuery,
} = authApi;
