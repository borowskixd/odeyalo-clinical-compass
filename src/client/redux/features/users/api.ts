import { api } from "../../api";
import {
  type GetMeResponseData,
  type ResponseSuccessInfo,
  type UpdateUserRequestData,
} from "@/shared/types";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<GetMeResponseData, void>({
      query: () => "/users/me",
      providesTags: ["Users", "Auth"],
    }),

    updateMe: builder.mutation<ResponseSuccessInfo, UpdateUserRequestData>({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteMe: builder.mutation<ResponseSuccessInfo, void>({
      query: (body) => ({
        url: "/users/me",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Users", "Auth"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateMeMutation, useDeleteMeMutation } =
  usersApi;
