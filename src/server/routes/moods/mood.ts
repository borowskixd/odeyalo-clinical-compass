import { NextResponse } from "next/server";
import { mapGetMoodResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { type GetMoodApiResponseData } from "@/shared/types";

const getMood = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const serverRequest = await serverFetch.get<GetMoodApiResponseData>(
      `/mood_tracker/${id}`,
    );

    const { data } = serverRequest;

    return NextResponse.json(mapGetMoodResponse(data));
  },
);

export const MoodRoutes = {
  GET: getMood,
};
