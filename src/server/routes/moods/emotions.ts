import { NextResponse } from "next/server";
import { mapGetEmotionsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { type GetEmotionsApiResponseData } from "@/shared/types";

const getEmotions = createRequest(async (request, serverFetch) => {
  const serverRequest = await serverFetch.get<GetEmotionsApiResponseData>(
    "/mood_tracker/emotions",
  );

  const { data } = serverRequest;

  return NextResponse.json(mapGetEmotionsResponse(data));
});

export const EmotionsRoutes = {
  GET: getEmotions,
};
