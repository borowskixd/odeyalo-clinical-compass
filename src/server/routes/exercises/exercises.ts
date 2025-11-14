import { NextResponse } from "next/server";
import {
  mapCompleteExerciseRequest,
  mapCompleteExerciseResponse,
  mapGetExercisesResponse,
} from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type CompleteExerciseApiRequestData,
  type CompleteExerciseApiResponseData,
  type CompleteExerciseRequestData,
  type GetExercisesApiResponseData,
} from "@/shared/types";

const getExercises = createRequest(async (request, serverFetch) => {
  const getExercisesResponse =
    await serverFetch.get<GetExercisesApiResponseData>("/exercises/");

  const responseData = mapGetExercisesResponse(getExercisesResponse.data);

  return NextResponse.json(responseData, httpStatuses.ok);
});

const completeExercise = createRequest(async (request, serverFetch) => {
  const body: CompleteExerciseRequestData = await request.json();

  const completeExerciseResponse = await serverFetch.post<
    CompleteExerciseApiResponseData,
    CompleteExerciseApiRequestData
  >("/exercises/complete", mapCompleteExerciseRequest(body));

  const responseData = mapCompleteExerciseResponse(
    completeExerciseResponse.data,
  );

  return NextResponse.json(responseData, httpStatuses.created);
});

export const ExercisesRoutes = {
  GET: getExercises,
  POST: completeExercise,
};
