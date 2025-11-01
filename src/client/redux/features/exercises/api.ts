import { api } from "@/client/redux/api";
import {
  type CompleteExerciseRequestData,
  type CompleteExerciseResponseData,
  type GetExerciseResponseData,
  type GetExerciseResultResponseData,
  type GetExerciseResultsResponseData,
  type GetExerciseStructureResponseData,
  type GetExercisesResponseData,
} from "@/shared/types";

const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<GetExercisesResponseData, void>({
      query: () => "/exercises",
    }),

    completeExercise: builder.mutation<
      CompleteExerciseResponseData,
      CompleteExerciseRequestData
    >({
      query: (body) => ({
        url: "/exercises",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ExerciseResults"],
    }),

    getExercise: builder.query<GetExerciseResponseData, string>({
      query: (exerciseId) => `/exercises/${exerciseId}`,
    }),

    getExerciseStructure: builder.query<
      GetExerciseStructureResponseData,
      string
    >({
      query: (exerciseId) => `/exercises/${exerciseId}/structure`,
    }),

    getExerciseResults: builder.query<GetExerciseResultsResponseData, string>({
      query: (exerciseId) => `/exercises/${exerciseId}/results`,
      providesTags: ["Auth", "ExerciseResults"],
    }),

    getExerciseResult: builder.query<
      GetExerciseResultResponseData,
      {
        exerciseId: string;
        resultId: string;
      }
    >({
      query: ({ exerciseId, resultId }) =>
        `/exercises/${exerciseId}/results/${resultId}`,
      providesTags: ["Auth", "ExerciseResults"],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useCompleteExerciseMutation,
  useGetExerciseQuery,
  useGetExerciseStructureQuery,
  useGetExerciseResultsQuery,
  useGetExerciseResultQuery,
} = exercisesApi;
