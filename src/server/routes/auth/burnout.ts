import { NextResponse } from "next/server";
import { mapBurnoutCalculateResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  GetBurnoutCalculateApiResponseData,
  GetBurnoutCalculateResponseData,
} from "@/shared/types";

const getBurnout = createRequest(async (request, serverFetch) => {
  const burnoutResponse =
    await serverFetch.get<GetBurnoutCalculateApiResponseData>(
      "/auth/burnout_calculate",
    );

  const data: GetBurnoutCalculateResponseData = mapBurnoutCalculateResponse(
    burnoutResponse.data,
  );

  return NextResponse.json(data, httpStatuses.ok);
});

export const BurnoutRoutes = {
  GET: getBurnout,
};
