import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetExerciseResultApiResponseData,
  type GetExerciseResultResponseData,
} from "@/shared/types";

export const mapGetExerciseResultResponse = (
  data: GetExerciseResultApiResponseData,
): GetExerciseResultResponseData => {
  const { id, title, picture_link, description, sections, exercise_id, date } =
    data;

  return {
    id,
    exerciseId: exercise_id,
    title,
    description,
    image: `${SEVER_API_URL}${picture_link}`,
    date,
    sections: sections.map((section) => {
      const { value, type, title, view } = section;

      return {
        label: title,
        view,
        type,
        value,
      };
    }),
  };
};
