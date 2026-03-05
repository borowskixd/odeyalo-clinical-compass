import {
  GetChatBotAnswerApiResponseData,
  GetChatBotQuestionsResponseData,
} from "@/shared/types";

export const mapGetQuestionsResponse = (
  answers: GetChatBotAnswerApiResponseData[],
): GetChatBotQuestionsResponseData => {
  return answers.map(({ id, answer, question }) => ({
    id,
    question,
    answer,
  }));
};
