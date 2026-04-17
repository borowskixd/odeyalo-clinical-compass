import { NextResponse } from "next/server";
import { mapGetPsychologistsResponse } from "@/server/mappers";
import { createRequest, getRequestTokens } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetPsychologistsApiResponseData,
  type GetPsychologistsResponseData,
  ResponseError,
} from "@/shared/types";
import { parseAccessJWT } from "@/shared/utils";

const getPsychologists = createRequest(async (request, serverFetch) => {
  const { accessToken } = getRequestTokens(request);
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

  // const myPsychologistsPromise =
  //   serverFetch.get<GetPsychologistsApiResponseData>("/managers");

  const psychologistsResponse =
    await serverFetch.get<GetPsychologistsApiResponseData>("/psychologist");

  // const [psychologistsResponse, myPsychologistsResponse] = await Promise.all([
  //   psychologistsPromise,
  //   myPsychologistsPromise,
  // ]);

  // const filteredPsychologists = psychologistsResponse.data.filter(
  //   (el) =>
  //     myPsychologistsResponse.data.findIndex((val) => el.id === val.id) ===
  //       -1 && el.id !== tokenData.payload.userId,
  // );

  const psychologistsResponseData: GetPsychologistsResponseData =
    mapGetPsychologistsResponse(psychologistsResponse.data);

  return NextResponse.json(psychologistsResponseData, httpStatuses.ok);
});

export const PsychologistsRoutes = {
  GET: getPsychologists,
};
