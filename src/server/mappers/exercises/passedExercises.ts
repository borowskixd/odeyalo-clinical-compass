import {
  type GetExerciseResultsResponseData,
  type GetUserPassedExercisesApiResponseData,
  type GetUserPassedExercisesResponseData,
} from "@/shared/types";

export const mapGetUserPassedExercisesResponse = (
  exercises: GetUserPassedExercisesApiResponseData,
  exerciseResults: GetExerciseResultsResponseData[],
): GetUserPassedExercisesResponseData => {
  const exerciseTitleMap = new Map(
    exercises.exercises.map(
      (exercise) => [exercise.id, exercise.title] as const,
    ),
  );

  const results = exerciseResults
    .flatMap((exerciseResult) =>
      exerciseResult.results.map((result) => ({
        id: result.id,
        exerciseId: result.exerciseId,
        exerciseTitle: exerciseTitleMap.get(result.exerciseId) ?? result.title,
        preview: result.title,
        date: result.date,
      })),
    )
    .sort((left, right) => {
      return new Date(right.date).getTime() - new Date(left.date).getTime();
    });

  return { results };
};
