import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";

const getExerciseResult = createRequest<{
  id: string;
  result_id: string;
}>(async (request, serverFetch, { id, result_id }) => {
  const getExerciseResultResponse = await serverFetch.get(
    `/exercises/${id}/results/${result_id}`,
  );

  return NextResponse.json(getExerciseResultResponse.data);
});

export const ExerciseResultRoutes = {
  GET: getExerciseResult,
};
