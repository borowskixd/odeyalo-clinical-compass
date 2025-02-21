import { NextResponse } from "next/server";
import { mapReadingThinkDiaryResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetReadingThinkApiResponseData,
  type GetReadingThinkResponseData,
} from "@/shared/types";

const getReadingThinkDiary = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.post<GetReadingThinkApiResponseData>(
      "/diary/reading_think_diary",
      {
        think_diary_id: id,
      },
    );

    const data: GetReadingThinkResponseData = mapReadingThinkDiaryResponse(
      response.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const DiaryRoutes = {
  GET: getReadingThinkDiary,
};
