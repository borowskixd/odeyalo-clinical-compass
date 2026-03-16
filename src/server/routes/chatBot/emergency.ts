import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { GetChatBotEmergencyResponseData } from "@/shared/types";

const getEmergency = createRequest(async (request, serverFetch) => {
  const getQuestionsPromise =
    await serverFetch.get<GetChatBotEmergencyResponseData>(
      `/chat-bot/emergency-contacts`,
    );

  return NextResponse.json(getQuestionsPromise.data, httpStatuses.ok);
});

export const ChatBotEmergencyRoutes = {
  GET: getEmergency,
};
