import { NextResponse } from "next/server";
import { mapGetUserPassedTestsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTestsResponseData,
  type GetUserPassedTestsApiResponseData,
} from "@/shared/types";

const getUserPassedTests = createRequest<{ userId: string }>(
  async (request, serverFetch, { userId }) => {
    const response = await serverFetch.get<GetUserPassedTestsApiResponseData>(
      `/tests/passed/user/${userId}`,
    );

    const data: GetTestsResponseData = mapGetUserPassedTestsResponse(
      response.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const UserPassedTestsRoutes = {
  GET: getUserPassedTests,
};
