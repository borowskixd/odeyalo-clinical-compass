import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { type GetExerciseResultApiResponseData } from "@/shared/types";

const getExerciseResults = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseResultsResponse =
      await serverFetch.get<GetExerciseResultApiResponseData>(
        `/exercises/${id}/results`,
      );

    return NextResponse.json(getExerciseResultsResponse.data);
  },
);

export const ExerciseResultsRoutes = {
  GET: getExerciseResults,
};
