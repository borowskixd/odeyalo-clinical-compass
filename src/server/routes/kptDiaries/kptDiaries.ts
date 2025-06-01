import { NextResponse } from "next/server";
import {
  mapGetKptDiariesResponse,
  mapSendKptDiaryRequest,
} from "@/server/mappers";
import { createRequest, getRequestAccessToken } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetKptDiariesApiResponseData,
  type GetKptDiariesResponseData,
  ResponseError,
  ResponseSuccessInfo,
  type SendKptDiaryApiRequestData,
  type SendKptDiaryRequestData,
} from "@/shared/types";
import { parseAccessJWT } from "@/shared/utils";

const sendKptDiary = createRequest(async (request, serverFetch) => {
  const body: SendKptDiaryRequestData = await request.json();

  await serverFetch.post<any, SendKptDiaryApiRequestData>(
    "/diary/writing_think_diary",
    mapSendKptDiaryRequest(body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("success sent"),
    httpStatuses.created,
  );
});

const getKptDiaries = createRequest(async (request, serverFetch) => {
  const accessToken = getRequestAccessToken(request);
  const tokenData = parseAccessJWT(accessToken);

  if (!tokenData) {
    return NextResponse.json(
      new ResponseError(
        httpStatuses.unauthorized.status,
        "Время сессии истекло",
      ),
      httpStatuses.unauthorized,
    );
  }
  const response = await serverFetch.get<GetKptDiariesApiResponseData>(
    `/problem/get_all_think_diary/${tokenData.payload.userId}`,
  );

  const data: GetKptDiariesResponseData = mapGetKptDiariesResponse(
    response.data,
  );

  return NextResponse.json(data, httpStatuses.ok);
});

export const KptDiariesRoutes = {
  POST: sendKptDiary,
  GET: getKptDiaries,
};
