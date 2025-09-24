import { NextResponse } from "next/server";
import { mapGetApplicationResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetApplicationApiResponseData,
  type GetApplicationResponseData,
  ResponseSuccessInfo,
} from "@/shared/types";

const getApplication = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.get<GetApplicationApiResponseData>(
      `/applications/${id}`,
    );

    const data: GetApplicationResponseData = mapGetApplicationResponse(
      response.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

const confirmApplication = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    await serverFetch.patch(`/applications/${id}/confirm`);

    return NextResponse.json(
      new ResponseSuccessInfo("Статус заявки обновлен"),
      httpStatuses.ok,
    );
  },
);

export const ApplicationRoutes = {
  GET: getApplication,
  POST: confirmApplication,
};
