import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { GetChatBotQuestionsResponseData } from "@/shared/types";

const getQuestions = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getQuestionsPromise =
      await serverFetch.get<GetChatBotQuestionsResponseData>(
        `/chat-bot/groups/${id}/questions`,
      );

    return NextResponse.json(getQuestionsPromise.data, httpStatuses.ok);
  },
);

export const ChatBotQuestionsRoutes = {
  GET: getQuestions,
};
