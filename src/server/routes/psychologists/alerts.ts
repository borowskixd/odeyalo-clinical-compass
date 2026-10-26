import { NextResponse } from "next/server";
import { mapGetPsychologistAlertsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetPsychologistAlertsApiResponseData,
  type GetPsychologistAlertsResponseData,
} from "@/shared/types";

const getPsychologistAlerts = createRequest(async (_request, serverFetch) => {
  const response = await serverFetch.get<GetPsychologistAlertsApiResponseData>(
    "/psychologist/alerts",
  );

  const data: GetPsychologistAlertsResponseData =
    mapGetPsychologistAlertsResponse(response.data);

  return NextResponse.json(data, httpStatuses.ok);
});

export const PsychologistAlertsRoutes = {
  GET: getPsychologistAlerts,
};
