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
    image: picture_link,
    closed: !open,
    questionsCount: questions_count,
    timeToRead: time_to_read,
  };
};
