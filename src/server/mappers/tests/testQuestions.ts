import {
  type GetTestApiResponseData,
  type GetTestQuestionsApiResponseData,
  type GetTestQuestionsResponseData,
} from "@/shared/types";

export const mapGetTestQuestionsResponse = (
  currentTest: GetTestApiResponseData,
  testQuestions: GetTestQuestionsApiResponseData,
): GetTestQuestionsResponseData => {
  const { id, title } = currentTest;

  return {
    id,
    title,
    questions: testQuestions.map(
      ({ id, test_id, number, text, answer_choices }) => ({
        id,
        testId: test_id,
        number,
        text,
        answerChoices: answer_choices.map(({ id, text, score }) => ({
          id,
          text,
          score,
        })),
      }),
    ),
  };
};
