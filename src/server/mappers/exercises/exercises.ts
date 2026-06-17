import { SEVER_API_URL } from "@/shared/config/api";
import {
  type CompleteExerciseApiRequestData,
  type CompleteExerciseApiResponseData,
  type CompleteExerciseRequestData,
  type CompleteExerciseResponseData,
  type GetExercisesApiResponseData,
  type GetExercisesResponseData,
} from "@/shared/types";

export const mapGetExercisesResponse = (
  data: GetExercisesApiResponseData,
): GetExercisesResponseData => {
  const mapExercise = ({
    id,
    open,
    title,
    picture_link,
  }: GetExercisesApiResponseData["regular_exercises"][number]) => ({
    id,
    title,
    image: `${SEVER_API_URL}${picture_link}`,
    closed: !open,
  });

  return {
    exercises: data.regular_exercises.map(mapExercise),
    relatedExercises: data.related_exercises.map(mapExercise),
  };
};

export const mapCompleteExerciseRequest = (
  data: CompleteExerciseRequestData,
): CompleteExerciseApiRequestData => {
  const { exerciseId, values } = data;

  return {
    exercise_structure_id: exerciseId,
    filled_fields: values.map((value) => ({
      field_id: value.id,
      text: value.value,
      pulled_completed_exercise_id: value.pulledCompletedExerciseId ?? null,
      pulled_group_key: value.pulledGroupKey ?? null,
    })),
  };
};

export const mapCompleteExerciseResponse = (
  data: CompleteExerciseApiResponseData,
): CompleteExerciseResponseData => {
  const { id, picture_link, success_message, score } = data;

  return {
    id,
    image: `${SEVER_API_URL}${picture_link}`,
    score,
    message: success_message,
  };
};
