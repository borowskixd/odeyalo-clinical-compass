import { NextResponse } from "next/server";
import { mapBurnoutCalculateResponse } from "@/server/mappers/auth/burnoutCalculate";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { GetBurnoutCalculateApiResponseData } from "@/shared/types";

const getBurnout = createRequest(async (request, serverFetch) => {
  const { data } = await serverFetch.get<GetBurnoutCalculateApiResponseData>(
    "/auth/burnout_calculate",
  );

  return NextResponse.json(mapBurnoutCalculateResponse(data), httpStatuses.ok);
});

export const BurnoutRoutes = {
  GET: getBurnout,
};
