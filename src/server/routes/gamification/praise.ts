import { NextResponse } from "next/server";
import { mapGetPraiseResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetPraiseApiResponse,
  type GetPraiseResponse,
} from "@/shared/types";

const getPraise = createRequest(async (request, serverFetch) => {
  const { data } =
    await serverFetch.get<GetPraiseApiResponse>(`/gamification/praise`);

  const mappedData: GetPraiseResponse = mapGetPraiseResponse(data);

  return NextResponse.json(mappedData, httpStatuses.ok);
});

export const PraiseRoutes = {
  GET: getPraise,
};
