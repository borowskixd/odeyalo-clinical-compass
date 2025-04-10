import { api } from "../../api";
import {
  type GetProblemDefinitionResponseData,
  type GetProblemDefinitionsResponseData,
  type ResponseSuccessInfo,
  type SendProblemDefinitionRequestData,
} from "@/shared/types";

const problemDefinitionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProblemDefinitions: builder.query<
      GetProblemDefinitionsResponseData,
      void
    >({
      query: () => "/exercises/problemDefinitions",
      providesTags: ["Auth", "ProblemDefinitions"],
    }),
    getProblemDefinition: builder.query<
      GetProblemDefinitionResponseData,
      string
    >({
      query: (id) => `/exercises/problemDefinitions/${id}`,
      providesTags: ["Auth"],
    }),
    sendProblemDefinition: builder.mutation<
      ResponseSuccessInfo,
      SendProblemDefinitionRequestData
    >({
      query: (body) => ({
        url: `/exercises/problemDefinitions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProblemDefinitions"],
    }),
  }),
});

export const {
  useGetProblemDefinitionsQuery,
  useGetProblemDefinitionQuery,
  useSendProblemDefinitionMutation,
} = problemDefinitionsApi;
