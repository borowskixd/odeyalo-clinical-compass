import { NextResponse } from "next/server";
import { mapGetKptDiaryResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetKptDiaryApiResponseData,
  type GetKptDiaryResponseData,
} from "@/shared/types";

const getKptDiary = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response = await serverFetch.post<GetKptDiaryApiResponseData>(
      "/diary/reading_think_diary",
      {
        think_diary_id: id,
      },
    );

    const data: GetKptDiaryResponseData = mapGetKptDiaryResponse(response.data);

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const KptDiaryRoutes = {
  GET: getKptDiary,
};
