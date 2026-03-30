import { NextResponse } from "next/server";
import { mapGetWeeklyMoodsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetWeeklyMoodsApiResponseData } from "@/shared/types";

const getWeeklyMoods = createRequest(async (request, serverFetch) => {
  const { data } =
    await serverFetch.get<GetWeeklyMoodsApiResponseData>(
      `/mood_tracker/weekly`,
    );

  const mappedData = mapGetWeeklyMoodsResponse(data);

  return NextResponse.json(mappedData, httpStatuses.ok);
});

export const WeeklyMoodsRoutes = {
  GET: getWeeklyMoods,
};
