import { NextResponse } from "next/server";
import { mapSendHrSurveyRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetUserApiResponseData,
  ResponseSuccessInfo,
  type SendHrSurveyApiRequestData,
  type SendHrSurveyRequestData,
} from "@/shared/types";

const sendHrSurvey = createRequest(async (request, serverFetch) => {
  const body: SendHrSurveyRequestData = await request.json();

  const { data } = await serverFetch.get<GetUserApiResponseData>("/auth/me");

  await serverFetch.patch<any, SendHrSurveyApiRequestData>(
    "/managers/manager",
    mapSendHrSurveyRequest(data, body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("Заявка создана"),
    httpStatuses.created,
  );
});

export const HrSurveyRoutes = {
  POST: sendHrSurvey,
};
