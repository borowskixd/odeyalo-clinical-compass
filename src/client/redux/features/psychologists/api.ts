import { api } from "../../api";
import {
  GetInquiriesResponseData,
  type GetPsychologistResponseData,
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
    getPsychologist: builder.query<GetPsychologistResponseData, string>({
      query: (id) => `/psychologists/${id}`,
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
  useGetPsychologistQuery,
  useGetMyPsychologistsQuery,
  useGetInquiriesQuery,
  useSendPsychologistSurveyMutation,
} = psychologistsApi;
