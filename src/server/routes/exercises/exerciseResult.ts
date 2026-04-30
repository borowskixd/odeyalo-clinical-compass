import { NextResponse } from "next/server";
import { mapGetExerciseResultResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetExerciseResultApiResponseData } from "@/shared/types";

const getExerciseResult = createRequest<{
  id: string;
  result_id: string;
}>(async (request, serverFetch, { id, result_id }) => {
  const userId = request.nextUrl.searchParams.get("user_id");
  const path = userId
    ? `/exercises/${id}/results/${result_id}/user/${userId}`
    : `/exercises/${id}/results/${result_id}`;

  const getExerciseResultResponse =
    await serverFetch.get<GetExerciseResultApiResponseData>(path);

  const responseData = mapGetExerciseResultResponse(
    getExerciseResultResponse.data,
  );

  return NextResponse.json(responseData, httpStatuses.ok);
});

export const ExerciseResultRoutes = {
  GET: getExerciseResult,
};
