import { NextResponse } from "next/server";
import { mapGetMoodsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { type GetMoodsApiResponseData } from "@/shared/types";

const getMoods = createRequest(async (request, serverFetch) => {
  const serverRequest = await serverFetch.get<GetMoodsApiResponseData>(
    "/mood_tracker/get_all_mood_tracker",
  );

  const { data } = serverRequest;

  console.log(data);

  return NextResponse.json(mapGetMoodsResponse(data));
});

export const MoodsRoutes = {
  GET: getMoods,
};
