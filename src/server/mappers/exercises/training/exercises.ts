import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetTrainingExercisesApiResponseData,
  type GetTrainingExercisesResponseData,
} from "@/shared/types";

export const mapGetTrainingExercisesResponse = (
  data: GetTrainingExercisesApiResponseData,
): GetTrainingExercisesResponseData => {
  const { exercises } = data;

  return {
    exercises: exercises.map((exercise) => {
      const { id, is_completed, title, picture_link } = exercise;

      return {
        id,
        title,
        image: `${SEVER_API_URL}${picture_link}`,
        completed: is_completed,
      };
    }),
  };
};
