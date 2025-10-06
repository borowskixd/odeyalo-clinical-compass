import { NextResponse } from "next/server";
import { mapGetMeResponse } from "@/server/mappers";
import { createRequest, deleteAuthCookies } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetMeApiResponseData,
  type GetMeResponseData,
  ResponseSuccessInfo,
} from "@/shared/types";

const getMe = createRequest(async (request, serverFetch) => {
  try {
    const response = await serverFetch.get<GetMeApiResponseData>(`/auth/me`);

    const data: GetMeResponseData = mapGetMeResponse(response.data);

    return NextResponse.json(data, httpStatuses.ok);
  } catch {
    return deleteAuthCookies(
      NextResponse.json(
        new ResponseSuccessInfo("unauthorized"),
        httpStatuses.unauthorized,
      ),
    );
  }
});

export const MeRoutes = {
  GET: getMe,
};
