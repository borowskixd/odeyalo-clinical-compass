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
      query: () => "/kptDiary",
      providesTags: ["Auth", "Diaries"],
    }),
    getKptDiary: builder.query<GetKptDiaryResponseData, string>({
      query: (id) => `/kptDiary/${id}`,
      providesTags: ["Auth"],
    }),
    sendKptDiary: builder.mutation<
      ResponseSuccessInfo,
      SendKptDiaryRequestData
    >({
      query: (body) => ({
        url: `/kptDiary`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Diaries"],
    }),
  }),
});

export const {
  useGetKptDiariesQuery,
  useGetKptDiaryQuery,
  useSendKptDiaryMutation,
} = kptDiaryApi;
