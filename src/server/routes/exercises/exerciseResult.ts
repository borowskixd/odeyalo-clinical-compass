import { NextResponse } from "next/server";
import { mapGetExerciseResultResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetExerciseResultApiResponseData } from "@/shared/types";

const getExerciseResult = createRequest<{
  id: string;
  result_id: string;
}>(async (request, serverFetch, { id, result_id }) => {
  const getExerciseResultResponse =
    await serverFetch.get<GetExerciseResultApiResponseData>(
      `/exercises/${id}/results/${result_id}`,
    );

  const responseData = mapGetExerciseResultResponse(
    getExerciseResultResponse.data,
  );

  return NextResponse.json(responseData, httpStatuses.ok);
});

export const ExerciseResultRoutes = {
  GET: getExerciseResult,
};
