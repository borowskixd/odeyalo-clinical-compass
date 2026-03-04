import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import type { GetChatBotAnswerResponseData } from "@/shared/types";

const getAnswer = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getArticlePromise =
      await serverFetch.get<GetChatBotAnswerResponseData>(
        `/chat-bot/questions/${id}`,
      );

    return NextResponse.json(getArticlePromise.data, httpStatuses.ok);
  },
);

export const ChatBotAnswersRoutes = {
  GET: getAnswer,
};
