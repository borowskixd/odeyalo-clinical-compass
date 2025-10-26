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
  const { exercises } = data;

  return {
    exercises: exercises.map((exercise) => {
      const { id, open, title, picture_link } = exercise;

      return {
        id,
        title,
        image: picture_link,
        closed: !open,
      };
    }),
  };
};

export const mapCompleteExerciseRequest = (
  data: CompleteExerciseRequestData,
): CompleteExerciseApiRequestData => {
  const { exercise_id, values } = data;

  return {
    exercise_structure_id: exercise_id,
    filled_fields: values.map((value) => ({
      field_id: value.id,
      text: value.value,
    })),
  };
};

export const mapCompleteExerciseResponse = (
  data: CompleteExerciseApiResponseData,
): CompleteExerciseResponseData => {
  const { id, picture_link, success_message, score } = data;

  return {
    id,
    image: picture_link,
    score,
    message: success_message,
  };
};
