type TestQuestionAnswersApiData = {
  id: string;
  text: string;
  score: number;
}[];

export type TestQuestionsApiData = {
  id: string;
  test_id: string;
  number: number;
  text: string;
  opposite_text: string | null;
  answer_choices: TestQuestionAnswersApiData;
};

export type GetTestQuestionsApiResponseData = TestQuestionsApiData[];

type TestQuestionAnswersData = {
  id: string;
  text: string;
  score: number;
}[];

type TestQuestionsData = {
  id: string;
  testId: string;
  number: number;
  text: string;
  oppositeText: string | null;
  answerChoices: TestQuestionAnswersData;
}[];

export interface GetTestQuestionsResponseData {
  id: string;
  title: string;
  questions: TestQuestionsData;
}
