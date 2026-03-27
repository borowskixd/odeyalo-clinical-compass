import { NextResponse } from "next/server";
import { mapGetTrainingExercisesResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetTrainingExercisesApiResponseData } from "@/shared/types";

const getTrainingExercises = createRequest(async (request, serverFetch) => {
  const getTrainingExercisesResponse =
    await serverFetch.get<GetTrainingExercisesApiResponseData>(
      "/training-exercises/",
    );

  const responseData = mapGetTrainingExercisesResponse(
    getTrainingExercisesResponse.data,
  );

  return NextResponse.json(responseData, httpStatuses.ok);
});

export const TrainingExercisesRoutes = {
  GET: getTrainingExercises,
};
