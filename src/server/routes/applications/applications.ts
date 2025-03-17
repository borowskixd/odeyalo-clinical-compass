import { NextResponse } from "next/server";
import {
  mapGetApplicationsResponse,
  mapSendApplicationRequest,
} from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetApplicationsApiResponseData,
  type GetApplicationsResponseData,
  ResponseSuccessInfo,
  type SendApplicationApiRequestData,
  type SendApplicationRequestData,
} from "@/shared/types";

const getApplications = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetApplicationsApiResponseData>(
    "/application/get_list_applications",
  );

  const data: GetApplicationsResponseData = mapGetApplicationsResponse(
    response.data,
  );

  return NextResponse.json(data, httpStatuses.ok);
});

const sendApplication = createRequest(async (request, serverFetch) => {
  const body: SendApplicationRequestData = await request.json();

  await serverFetch.post<any, SendApplicationApiRequestData>(
    "/client/send_application",
    mapSendApplicationRequest(body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("Заявка отправлена"),
    httpStatuses.created,
  );
});

export const ApplicationsRoutes = {
  GET: getApplications,
  POST: sendApplication,
};
