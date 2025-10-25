import { NextResponse } from "next/server";
import { mapGetExerciseResultsResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetExerciseResultsApiResponseData } from "@/shared/types";

const getExerciseResults = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseResultsResponse =
      await serverFetch.get<GetExerciseResultsApiResponseData>(
        `/exercises/${id}/results`,
      );

    const responseData = mapGetExerciseResultsResponse(
      getExerciseResultsResponse.data,
    );

    return NextResponse.json(responseData, httpStatuses.ok);
  },
);

export const ExerciseResultsRoutes = {
  GET: getExerciseResults,
};
