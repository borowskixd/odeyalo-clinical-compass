import { api } from "../../api";
import {
  type GetKptDiariesResponseData,
  type GetKptDiaryResponseData,
  type ResponseSuccessInfo,
  type SendKptDiaryRequestData,
} from "@/shared/types";

const kptDiaryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getKptDiaries: builder.query<GetKptDiariesResponseData, void>({
      query: () => "/exercises/kptDiary",
      providesTags: ["Auth", "KptDiaries"],
    }),
    getKptDiary: builder.query<GetKptDiaryResponseData, string>({
      query: (id) => `/exercises/kptDiary/${id}`,
      providesTags: ["Auth"],
    }),
    sendKptDiary: builder.mutation<
      ResponseSuccessInfo,
      SendKptDiaryRequestData
    >({
      query: (body) => ({
        url: `/exercises/kptDiary`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["KptDiaries"],
    }),
  }),
});

export const {
  useGetKptDiariesQuery,
  useGetKptDiaryQuery,
  useSendKptDiaryMutation,
} = kptDiaryApi;
