import { api } from "@/client/redux/api";
import {
  type CompleteExerciseRequestData,
  type CompleteExerciseResponseData,
  type GetExerciseResponseData,
  type GetExerciseResultResponseData,
  type GetExerciseResultsResponseData,
  type GetExercisesResponseData,
  type GetExerciseStructureResponseData,
  type GetTrainingExerciseResponseData,
  type GetTrainingExercisesResponseData,
  type GetTrainingExerciseStructureResponseData,
  type GetUserPassedExercisesResponseData,
  type ResponseSuccessInfo,
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

    getUserPassedExercises: builder.query<
      GetUserPassedExercisesResponseData,
      string
    >({
      query: (userId) => `/exercises/passed/${userId}`,
      providesTags: ["Auth", "ExerciseResults"],
    }),

    getExerciseResult: builder.query<
      GetExerciseResultResponseData,
      {
        exerciseId: string;
        resultId: string;
        userId?: string | null;
      }
    >({
      query: ({ exerciseId, resultId, userId }) =>
        `/exercises/${exerciseId}/results/${resultId}${
          userId ? `?user_id=${userId}` : ""
        }`,
      providesTags: ["Auth", "ExerciseResults"],
    }),

    getTrainingExercises: builder.query<GetTrainingExercisesResponseData, void>(
      {
        query: () => "/exercises/training",
        providesTags: ["TrainingExercise"],
      },
    ),

    completeTrainingExercise: builder.mutation<ResponseSuccessInfo, string>({
      query: (trainingExerciseId) => ({
        url: `/exercises/training/${trainingExerciseId}`,
        method: "POST",
      }),
      invalidatesTags: ["TrainingExercise"],
    }),

    getTrainingExercise: builder.query<GetTrainingExerciseResponseData, string>(
      {
        query: (trainingExerciseId) =>
          `/exercises/training/${trainingExerciseId}`,
        providesTags: ["TrainingExercise"],
      },
    ),

    getTrainingExerciseStructure: builder.query<
      GetTrainingExerciseStructureResponseData,
      string
    >({
      query: (trainingExerciseId) =>
        `/exercises/training/${trainingExerciseId}/structure`,
      providesTags: ["TrainingExercise"],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useCompleteExerciseMutation,
  useGetExerciseQuery,
  useGetExerciseStructureQuery,
  useGetExerciseResultsQuery,
  useGetUserPassedExercisesQuery,
  useGetExerciseResultQuery,
  useGetTrainingExercisesQuery,
  useGetTrainingExerciseQuery,
  useGetTrainingExerciseStructureQuery,
  useCompleteTrainingExerciseMutation,
} = exercisesApi;
