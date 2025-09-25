import { NextResponse } from "next/server";
import { mapGetEmojisResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { type GetEmojisApiResponseData } from "@/shared/types";

const getEmojis = createRequest(async (request, serverFetch) => {
  const serverRequest =
    await serverFetch.get<GetEmojisApiResponseData>(`/mood_tracker/emoji`);

  const { data } = serverRequest;

  return NextResponse.json(mapGetEmojisResponse(data));
});

export const EmojiRoutes = {
  GET: getEmojis,
};
