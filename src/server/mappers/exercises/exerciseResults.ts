import {
  type GetExerciseResultsApiResponseData,
  type GetExerciseResultsResponseData,
} from "@/shared/types";

export const mapGetExerciseResultsResponse = (
  data: GetExerciseResultsApiResponseData,
): GetExerciseResultsResponseData => {
  const { results } = data;

  return {
    results: results.map((result) => {
      const { id, exercise_id, preview, date } = result;

      return {
        id,
        exerciseId: exercise_id,
        title: preview,
        date,
      };
    }),
  };
};
