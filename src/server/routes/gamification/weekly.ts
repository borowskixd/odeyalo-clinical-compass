import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetWeeklyGamificationScoreResponse } from "@/shared/types";

const getWeeklyGamificationScore = createRequest(
  async (request, serverFetch) => {
    const { data } = await serverFetch.get<GetWeeklyGamificationScoreResponse>(
      `/gamification/weekly-scores`,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const WeeklyGamificationRoutes = {
  GET: getWeeklyGamificationScore,
};
