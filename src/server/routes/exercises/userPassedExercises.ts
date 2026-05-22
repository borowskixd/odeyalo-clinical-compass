import { NextResponse } from "next/server";
import {
  mapGetExerciseResultsResponse,
  mapGetUserPassedExercisesResponse,
} from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetExerciseResultsApiResponseData,
  type GetUserPassedExercisesApiResponseData,
  type GetUserPassedExercisesResponseData,
} from "@/shared/types";

const getUserPassedExercises = createRequest<{ userId: string }>(
  async (request, serverFetch, { userId }) => {
    const { data: exercises } =
      await serverFetch.get<GetUserPassedExercisesApiResponseData>(
        `/exercises/passed/user/${userId}`,
      );

    const exerciseResults = await Promise.all(
      exercises.exercises.map(async (exercise) => {
        const response =
          await serverFetch.get<GetExerciseResultsApiResponseData>(
            `/exercises/${exercise.id}/results/user/${userId}`,
          );

        return mapGetExerciseResultsResponse(response.data);
      }),
    );

    const responseData: GetUserPassedExercisesResponseData =
      mapGetUserPassedExercisesResponse(exercises, exerciseResults);

    return NextResponse.json(responseData, httpStatuses.ok);
  },
);

export const UserPassedExercisesRoutes = {
  GET: getUserPassedExercises,
};
