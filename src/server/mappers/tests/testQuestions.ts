import {
  type GetTestApiResponseData,
  type GetTestQuestionsApiResponseData,
  type GetTestQuestionsResponseData,
} from "@/shared/types";

export const mapGetTestQuestionsResponse = (
  currentTest: GetTestApiResponseData,
  testQuestions: GetTestQuestionsApiResponseData,
): GetTestQuestionsResponseData => {
  const { id, short_desc } = currentTest;

  return {
    id,
    title: short_desc,
    questions: testQuestions.map(
      ({ id, test_id, number, text, opposite_text, answer_choices }) => ({
        id,
        testId: test_id,
        number,
        text,
        oppositeText: opposite_text,
        answerChoices: answer_choices.map(({ id, text, score }) => ({
          id,
          text,
          score,
        })),
      }),
    ),
  };
};
