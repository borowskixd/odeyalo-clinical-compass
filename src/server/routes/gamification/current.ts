import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetCurrentGamificationScoreResponse } from "@/shared/types";

const getCurrentGamificationScore = createRequest(
  async (request, serverFetch) => {
    const { data } = await serverFetch.get<GetCurrentGamificationScoreResponse>(
      `/gamification/current-score`,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const CurrentGamificationRoutes = {
  GET: getCurrentGamificationScore,
};
