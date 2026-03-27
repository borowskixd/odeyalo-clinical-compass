import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetTrainingExerciseApiResponseData,
  type GetTrainingExerciseResponseData,
} from "@/shared/types";

export const mapGetTrainingExerciseResponse = (
  data: GetTrainingExerciseApiResponseData,
): GetTrainingExerciseResponseData => {
  const { id, title, picture_link, is_completed, description, time_to_read } =
    data;

  return {
    id,
    title,
    description,
    image: `${SEVER_API_URL}${picture_link}`,
    completed: is_completed,
    timeToRead: time_to_read,
  };
};
