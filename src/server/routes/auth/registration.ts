import { NextResponse } from "next/server";
import {
  mapRegistrationRequest,
  mapRegistrationResponse,
} from "@/server/mappers/auth";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type RegistrationApiRequestData,
  type RegistrationApiResponseData,
  type RegistrationRequestData,
  type RegistrationResponseData,
} from "@/shared/types";

const registration = createRequest(async (request, serverFetch) => {
  const body: RegistrationRequestData = await request.json();

  const serverResponse = await serverFetch.post<
    RegistrationApiResponseData,
    RegistrationApiRequestData
  >("/users/reg", mapRegistrationRequest(body));

  const data = serverResponse.data;

  const responseData = mapRegistrationResponse(data);

  const response = NextResponse.json<RegistrationResponseData>(
    responseData,
    httpStatuses.created,
  );

  return response;
});

export const RegistrationRoutes = {
  POST: registration,
};
