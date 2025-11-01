import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetExerciseApiResponseData,
  type GetExerciseResponseData,
} from "@/shared/types";

export const mapGetExerciseResponse = (
  data: GetExerciseApiResponseData,
): GetExerciseResponseData => {
  const {
    id,
    title,
    picture_link,
    open,
    description,
    time_to_read,
    questions_count,
  } = data;

  return {
    id,
    title,
    description,
    image: `${SEVER_API_URL}${picture_link}`,
    closed: !open,
    questionsCount: questions_count,
    timeToRead: time_to_read,
  };
};
