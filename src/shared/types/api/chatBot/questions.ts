export type GetChatBotAnswerApiResponseData = {
  id: number;
  question: string;
  answer: string;
};

export type GetChatBotQuestionsResponseData = {
  id: number;
  question: string;
  answer: string;
}[];

export type GetChatBotQuestionsApiResponseData = {
  id: number;
  question: string;
}[];
