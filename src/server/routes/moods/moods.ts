import { NextResponse } from "next/server";
import { mapGetMoodsResponse, mapSaveMoodRequest } from "@/server/mappers";
import { addSearchParams, createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetMoodsApiResponseData,
  ResponseSuccessInfo,
  type SaveMoodApiRequestData,
} from "@/shared/types";

const getMoods = createRequest(async (request, serverFetch) => {
  const serverRequest = await serverFetch.get<GetMoodsApiResponseData>(
    addSearchParams("/mood_tracker/get_all_mood_tracker", request, "date"),
  );

  const { data } = serverRequest;

  return NextResponse.json(mapGetMoodsResponse(data));
});

const saveMood = createRequest(async (request, serverFetch) => {
  const body = await request.json();

  await serverFetch.post<any, SaveMoodApiRequestData>(
    `/mood_tracker/save_mood_tracker`,
    mapSaveMoodRequest(body),
  );

  return NextResponse.json({
    body: new ResponseSuccessInfo("success saved"),
    status: httpStatuses.ok,
  });
});

export const MoodsRoutes = {
  GET: getMoods,
  POST: saveMood,
};
