import { NextResponse } from "next/server";
import { mapGetPracticesResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { type GetPracticesApiResponseData } from "@/shared/types";

const getPractices = createRequest(async (request, serverFetch) => {
  const { data } = await serverFetch.get<GetPracticesApiResponseData>(
    "/exercise/get_all_exercises",
  );

  return NextResponse.json(mapGetPracticesResponse(data));
});

export const PracticesRoutes = {
  GET: getPractices,
};
