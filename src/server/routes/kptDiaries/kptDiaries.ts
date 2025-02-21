import { NextResponse } from "next/server";
import {
  mapGetDiaryResponse,
  mapWritingThinkDiaryRequest,
} from "@/server/mappers";
import {
  createRequest,
  getRequestAccessToken,
  loginByToken,
} from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetDiaryApiResponseData,
  type GetDiaryResponseData,
  ResponseError,
  ResponseSuccessInfo,
  type SendWritingThinkApiRequestData,
  type SendWritingThinkRequestData,
} from "@/shared/types";

const sendWritingThinkDiary = createRequest(async (request, serverFetch) => {
  const body: SendWritingThinkRequestData = await request.json();

  await serverFetch.post<any, SendWritingThinkApiRequestData>(
    "/diary/writing_think_diary",
    mapWritingThinkDiaryRequest(body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("success sent"),
    httpStatuses.created,
  );
});

const getAllThinkDiary = createRequest(async (request, serverFetch) => {
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
  const response = await serverFetch.get<GetDiaryApiResponseData>(
    `/problem/get_all_think_diary`,
  );

  const data: GetDiaryResponseData = mapGetDiaryResponse(response.data);

  return NextResponse.json(data, httpStatuses.ok);
});

export const writingDiaryRoutes = {
  POST: sendWritingThinkDiary,
  GET: getAllThinkDiary,
};
