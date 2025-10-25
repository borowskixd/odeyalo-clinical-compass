import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";

const getExerciseResults = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseResultsResponse = await serverFetch.get(
      `/exercises/${id}/results`,
    );

    return NextResponse.json(getExerciseResultsResponse.data);
  },
);

export const ExerciseResultsRoutes = {
  GET: getExerciseResults,
};
