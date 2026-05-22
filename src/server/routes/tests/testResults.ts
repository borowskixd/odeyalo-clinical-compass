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
  type GetTestResultApiResponseData,
  type GetTestResultsApiResponseData,
  type GetTestResultsResponseData,
  type SendTestResultApiRequestData,
  type SendTestResultApiResponseData,
  type SendTestResultRequestData,
} from "@/shared/types";

const isTestResult = (data: unknown): data is GetTestResultApiResponseData => {
  return Boolean(
    data &&
    typeof data === "object" &&
    "test_result_id" in data &&
    "test_id" in data,
  );
};

const normalizeTestResultsResponse = (
  data: unknown,
): GetTestResultsApiResponseData => {
  if (Array.isArray(data)) {
    return data as GetTestResultsApiResponseData;
  }

  if (isTestResult(data)) {
    return [data];
  }

  if (
    data &&
    typeof data === "object" &&
    "results" in data &&
    Array.isArray(data.results)
  ) {
    return data.results as GetTestResultsApiResponseData;
  }

  return [];
};

const getUserTestResults = async (
  serverFetch: {
    get: <T = any, D = any>(url: string, data?: D) => Promise<{ data: T }>;
  },
  testId: string,
  userId: string | null,
): Promise<GetTestResultsApiResponseData> => {
  if (!userId) {
    const response = await serverFetch.get<unknown>(
      `/tests/${testId}/results/`,
    );

    return normalizeTestResultsResponse(response.data);
  }

  try {
    const response = await serverFetch.get<unknown>(
      `/psychologist/clients/${userId}/tests/${testId}/results`,
    );

    return normalizeTestResultsResponse(response.data);
  } catch {
    const response = await serverFetch.get<unknown>(
      `/tests/${testId}/results/?user_id=${userId}`,
    );

    return normalizeTestResultsResponse(response.data);
  }
};

const getTestResults = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const userId = request.nextUrl.searchParams.get("user_id");
    const getTestResultPromise = getUserTestResults(serverFetch, id, userId);

    const getTestPromise = serverFetch.get<GetTestApiResponseData>(
      `/tests/${id}`,
    );

    const [testResultsData, getTestResponse] = await Promise.all([
      getTestResultPromise,
      getTestPromise,
    ]);

    const data: GetTestResultsResponseData = mapGetTestResultsResponse(
      getTestResponse.data,
      testResultsData,
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
