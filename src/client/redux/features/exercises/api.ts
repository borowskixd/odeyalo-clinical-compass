import { api } from "@/client/redux/api";

const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query({
      query: () => "/exercises",
    }),

    completeExercise: builder.mutation({
      query: () => ({
        url: "/exercises",
        method: "POST",
      }),
      invalidatesTags: ["ExerciseResults"],
    }),

    getExercise: builder.query({
      query: (exerciseId: string) => `/exercises/${exerciseId}`,
    }),

    getExerciseStructure: builder.query({
      query: (exerciseId: string) => `/exercises/${exerciseId}/structure`,
    }),

    getExerciseResults: builder.query({
      query: (exerciseId: string) => `/exercises/${exerciseId}/results`,
    }),

    getExerciseResult: builder.query({
      query: ({
        exerciseId,
        resultId,
      }: {
        exerciseId: string;
        resultId: string;
      }) => `/exercises/${exerciseId}/results/${resultId}`,
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
