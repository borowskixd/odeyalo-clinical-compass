import { NextResponse } from "next/server";
import { createRequest, setAuthCookies } from "@/server/utils";
import { serverAxios } from "@/shared/config/api";
import { cookies, httpStatuses } from "@/shared/data";
import {
  ResponseSuccessInfo,
  type SendPsychologistSurveyRequestData,
} from "@/shared/types";

const sendPsychologistSurvey = createRequest(async (request, serverFetch) => {
  const body: SendPsychologistSurveyRequestData = await request.json();

  await serverFetch.patch<any, SendPsychologistSurveyRequestData>(
    "/psychologist/become",
    body,
  );

  const refreshToken = request.cookies.get(cookies.refreshToken.name)?.value;
  const { data } = await serverAxios.post("/auth/refresh-token", {
    refresh_token: refreshToken,
  });

  return setAuthCookies(
    NextResponse.json(
      new ResponseSuccessInfo("Заявка создана"),
      httpStatuses.created,
    ),
    {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    },
  );
});

export const PsychologistSurveyRoutes = {
  POST: sendPsychologistSurvey,
};
