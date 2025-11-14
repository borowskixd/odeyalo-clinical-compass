import { NextResponse } from "next/server";
import { mapGetMeResponse, mapUpdateUserRequest } from "@/server/mappers";
import { createRequest, deleteAuthCookies } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetMeApiResponseData,
  type GetMeResponseData,
  ResponseSuccessInfo,
  type UpdateUserApiRequestData,
  type UpdateUserRequestData,
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

const updateMe = createRequest(async (request, serverFetch) => {
  const body: UpdateUserRequestData = await request.json();

  await serverFetch.patch<any, UpdateUserApiRequestData>(
    `/auth/update`,
    mapUpdateUserRequest(body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("user successfully updated"),
    httpStatuses.ok,
  );
});

const deleteMe = createRequest(async (request, serverFetch) => {
  await serverFetch.delete<void>(`/auth/delete`);

  return deleteAuthCookies(
    NextResponse.json(
      new ResponseSuccessInfo("user successfully deleted"),
      httpStatuses.noContent,
    ),
  );
});

export const MeRoutes = {
  GET: getMe,
  PUT: updateMe,
  DELETE: deleteMe,
};
