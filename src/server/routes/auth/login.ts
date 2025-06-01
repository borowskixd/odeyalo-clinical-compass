import { NextResponse } from "next/server";
import { mapLoginRequest } from "@/server/mappers/auth";
import { createRequest, setAuthCookies } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type LoginApiRequestData,
  type LoginApiResponseData,
  type LoginRequestData,
  ResponseSuccessInfo,
} from "@/shared/types";

const login = createRequest(async (request, serverFetch) => {
  const body: LoginRequestData = await request.json();

  const loginResponse = await serverFetch.post<
    LoginApiResponseData,
    LoginApiRequestData
  >("/auth/login", mapLoginRequest(body));

  const token = loginResponse.data.access_token;

  const response = setAuthCookies(
    NextResponse.json<ResponseSuccessInfo>(
      new ResponseSuccessInfo("login success"),
      httpStatuses.ok,
    ),
    token,
  );

  return response;
});

export const LoginRoutes = {
  POST: login,
};
