import { NextResponse } from "next/server";
import { mapLoginRequest, mapLoginResponse } from "@/server/mappers/auth";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type LoginApiRequestData,
  type LoginApiResponseData,
  type LoginRequestData,
  type LoginResponseData,
  type UserApiResponseData,
} from "@/shared/types";

const login = createRequest(async (request, serverFetch) => {
  const body: LoginRequestData = await request.json();

  const serverResponse = await serverFetch.post<
    LoginApiResponseData,
    LoginApiRequestData
  >("/auth/login", mapLoginRequest(body));
  const userDataResponse =
    await serverFetch.get<UserApiResponseData>("/auth/me");
  const data = serverResponse.data;
  console.log(userDataResponse.data);
  const responseData = mapLoginResponse(userDataResponse.data);

  const response = NextResponse.json<LoginResponseData>(
    responseData,
    httpStatuses.created,
  );

  return response;
});

export const LoginRoutes = {
  POST: login,
};
