import { NextResponse } from "next/server";
import { mapGetClientsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetClientsApiResponseData,
  type GetClientsResponseData,
} from "@/shared/types";

const getClients = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetClientsApiResponseData>("/client");

  const data: GetClientsResponseData = mapGetClientsResponse(response.data);

  return NextResponse.json(data, httpStatuses.ok);
});

export const ClientsRoutes = {
  GET: getClients,
};
