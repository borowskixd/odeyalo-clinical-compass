import { api } from "../../api";
import {
  GetInquiriesResponseData,
  type GetPsychologistsResponseData,
  type ResponseSuccessInfo,
  SendPsychologistSurveyRequestData,
} from "@/shared/types";

const psychologistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPsychologists: builder.query<GetPsychologistsResponseData, void>({
      query: () => "/psychologists",
      providesTags: ["Auth"],
    }),
    getMyPsychologists: builder.query<GetPsychologistsResponseData, void>({
      query: () => "/psychologists/my",
      providesTags: ["Auth"],
    }),
    getInquiries: builder.query<GetInquiriesResponseData, void>({
      query: () => "/psychologists/inquiry",
    }),
    sendPsychologistSurvey: builder.mutation<
      ResponseSuccessInfo,
      SendPsychologistSurveyRequestData
    >({
      query: (body) => ({
        url: "/psychologists/survey",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useGetPsychologistsQuery,
  useGetMyPsychologistsQuery,
  useGetInquiriesQuery,
  useSendPsychologistSurveyMutation,
} = psychologistsApi;
