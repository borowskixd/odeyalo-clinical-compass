import { NextResponse } from "next/server";
import { mapGetMoodResponse, mapSaveMoodRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetMoodApiResponseData,
  ResponseSuccessInfo,
  type SaveMoodApiRequestData,
} from "@/shared/types";

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

const getMood = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const serverRequest = await serverFetch.get<GetMoodApiResponseData>(
      `/mood_tracker/get_mood_tracker/${id}`,
    );

    const { data } = serverRequest;

    return NextResponse.json(mapGetMoodResponse(data));
  },
);

export const MoodRoutes = {
  POST: saveMood,
  GET: getMood,
};
