import { api } from "../../api";
import {
  type GetApplicationResponseData,
  type GetApplicationsResponseData,
  type ResponseSuccessInfo,
  type SendApplicationRequestData,
} from "@/shared/types";

const applicationsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<GetApplicationsResponseData, void>({
      query: () => "/applications",
      providesTags: ["Auth", "Applications"],
    }),

    getApplication: builder.query<GetApplicationResponseData, string>({
      query: (id) => `/applications/${id}`,
      providesTags: ["Auth"],
    }),

    sendApplication: builder.mutation<
      ResponseSuccessInfo,
      SendApplicationRequestData
    >({
      query: (body) => ({
        url: "/applications",
        method: "POST",
        body,
      }),
    }),

    confirmApplication: builder.mutation<ResponseSuccessInfo, string>({
      query: (id) => ({
        url: `/applications/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Applications", "Clients"],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationQuery,
  useSendApplicationMutation,
  useConfirmApplicationMutation,
} = applicationsApi;
