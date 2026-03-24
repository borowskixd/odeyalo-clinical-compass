import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetTrainingExerciseStructureApiResponseData,
  type GetTrainingExerciseStructureResponseData,
} from "@/shared/types";

export const mapGetTrainingExerciseStructureResponse = (
  data: GetTrainingExerciseStructureApiResponseData,
): GetTrainingExerciseStructureResponseData => {
  const { id, title, picture_link, questions, description, time_to_read } =
    data;

  return {
    id,
    title,
    description,
    image: `${SEVER_API_URL}${picture_link}`,
    timeToRead: time_to_read,
    questions: questions.map((question) => ({
      id: question.id,
      question: question.text,
      answers: question.variants.map((variant) => {
        const { id, title, explanation, correct } = variant;

        return {
          id,
          answer: title,
          explanation,
          correct,
        };
      }),
    })),
  };
};
