import { AxiosResponse } from "axios";
import { NextResponse } from "next/server";
import { mapGetQuestionsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  GetChatBotAnswerApiResponseData,
  GetChatBotQuestionsApiResponseData,
} from "@/shared/types";

const getQuestions = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const { data: questions } =
      await serverFetch.get<GetChatBotQuestionsApiResponseData>(
        `/chat-bot/groups/${id}/questions`,
      );

    const promises: Promise<AxiosResponse<GetChatBotAnswerApiResponseData>>[] =
      [];

    for (const question of questions) {
      promises.push(
        serverFetch.get<GetChatBotAnswerApiResponseData>(
          `/chat-bot/questions/${question.id}`,
        ),
      );
    }

    const answers = (await Promise.all(promises)).map((el) => el.data);

    return NextResponse.json(mapGetQuestionsResponse(answers), httpStatuses.ok);
  },
);

export const ChatBotQuestionsRoutes = {
  GET: getQuestions,
};
