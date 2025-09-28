import { NextResponse } from "next/server";
import {
  mapGetTestResultsResponse,
  mapSendTestResultRequest,
  mapSendTestResultResponse,
} from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestApiResponseData,
  type GetTestResultsApiResponseData,
  type GetTestResultsResponseData,
  type SendTestResultApiRequestData,
  type SendTestResultApiResponseData,
  type SendTestResultRequestData,
} from "@/shared/types";

const getTestResults = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const userId = request.nextUrl.searchParams.get("user_id");
    const getTestResultPromise = serverFetch.get<GetTestResultsApiResponseData>(
      `/tests/${id}/results/${userId ? `?user_id=${userId}` : ""}`,
    );

    const getTestPromise = serverFetch.get<GetTestApiResponseData>(
      `/tests/${id}`,
    );

    const [getTestResultResponse, getTestResponse] = await Promise.all([
      getTestResultPromise,
      getTestPromise,
    ]);

    const data: GetTestResultsResponseData = mapGetTestResultsResponse(
      getTestResponse.data,
      getTestResultResponse.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

const sendTestResult = createRequest(async (request, serverFetch) => {
  const body: SendTestResultRequestData = await request.json();

  const { data } = await serverFetch.post<
    SendTestResultApiResponseData,
    SendTestResultApiRequestData
  >("/tests/result", mapSendTestResultRequest(body));

  return NextResponse.json(mapSendTestResultResponse(data), httpStatuses.ok);
});

export const TestResultsRoutes = {
  GET: getTestResults,
  POST: sendTestResult,
};
