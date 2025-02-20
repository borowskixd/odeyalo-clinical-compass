import { NextResponse } from "next/server";
import {
  mapGetDiaryResponse,
  mapReadingThinkDiaryResponse,
} from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetDiaryApiResponseData,
  type GetDiaryResponseData,
  type ReadingThinkDiaryApiResponseData,
  type ReadingThinkDiaryResponseData,
} from "@/shared/types";

const getReadingThinkDiary = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.post<ReadingThinkDiaryApiResponseData>(
    "/diary/reading_think_diary",
  );

  const data: ReadingThinkDiaryResponseData = mapReadingThinkDiaryResponse(
    response.data,
  );

  return NextResponse.json(data, httpStatuses.ok);
});

const getAllThinkDiary = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.get<GetDiaryApiResponseData>(
      `/problem/get_all_think_diary/${id}`,
    );

    const data: GetDiaryResponseData = mapGetDiaryResponse(response.data);

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const DiaryRoutes = {
  GET: getAllThinkDiary,
  POST: getReadingThinkDiary,
};
