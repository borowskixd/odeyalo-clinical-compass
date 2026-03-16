import { api } from "../../api";
import {
  GetChatBotEmergencyResponseData,
  GetChatBotGroupsResponseData,
  GetChatBotQuestionsResponseData,
} from "@/shared/types";

const chatBotApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChatBotGroups: builder.query<GetChatBotGroupsResponseData, void>({
      query: () => "/chat-bot/groups",
    }),

    getChatBotQuestions: builder.query<GetChatBotQuestionsResponseData, number>(
      {
        query: (groupId) => `/chat-bot/questions/${groupId}`,
      },
    ),

    getChatBotEmergency: builder.query<GetChatBotEmergencyResponseData, void>({
      query: () => `/chat-bot/emergency`,
    }),
  }),
});

export const {
  useGetChatBotGroupsQuery,
  useGetChatBotEmergencyQuery,
  useGetChatBotQuestionsQuery,
} = chatBotApi;
