import { NextResponse } from "next/server";
import { mapWritingThinkDiaryRequest } from "@/server/mappers";
import {
  createRequest,
  getRequestAccessToken,
  loginByToken,
} from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  ResponseError,
  ResponseSuccessInfo,
  type WritingThinkDiaryApiRequestData,
  type WritingThinkDiaryRequestData,
} from "@/shared/types";

const sendWritingThinkDiary = createRequest(async (request, serverFetch) => {
  const body: WritingThinkDiaryRequestData = await request.json();
  const accessToken = getRequestAccessToken(request);

  const loginByTokenResponse = await loginByToken(accessToken);

  if (!loginByTokenResponse) {
    return NextResponse.json(
      new ResponseError(
        httpStatuses.unauthorized.status,
        "Время сессии истекло",
      ),
      httpStatuses.unauthorized,
    );
  }

  const WritingThinkDiaryResponse = serverFetch.post<
    any,
    WritingThinkDiaryApiRequestData
  >("/diary/writing_think_diary", mapWritingThinkDiaryRequest(body));

  await Promise.all([WritingThinkDiaryResponse]);

  return NextResponse.json(
    new ResponseSuccessInfo("Заявка отправлена"),
    httpStatuses.created,
  );
});

export const writingDiaryRoutes = {
  POST: sendWritingThinkDiary,
};
