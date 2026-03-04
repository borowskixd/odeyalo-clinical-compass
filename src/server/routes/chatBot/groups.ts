import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { GetChatBotGroupsResponseData } from "@/shared/types/api/chatBot/groups";

const getQuestions = createRequest(async (request, serverFetch) => {
  const getQuestionsPromise =
    await serverFetch.get<GetChatBotGroupsResponseData>(`/chat-bot/groups`);

  return NextResponse.json(getQuestionsPromise.data, httpStatuses.ok);
});

export const ChatBotGroupsRoutes = {
  GET: getQuestions,
};
