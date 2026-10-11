import { NextResponse } from "next/server";
import { mapGetMoodTagResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import type { GetMoodTagsApiResponseData } from "@/shared/types";

const getMoodTags = createRequest(async (request, serverFetch) => {
  const { data } = await serverFetch.get<GetMoodTagsApiResponseData>(
    "/mood_tracker/influence-factors",
  );

  return NextResponse.json(data.map(mapGetMoodTagResponse));
});

export const MoodTagsRoutes = {
  GET: getMoodTags,
};
