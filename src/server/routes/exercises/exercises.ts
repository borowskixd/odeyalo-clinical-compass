import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";

const getExercises = createRequest(async (request, serverFetch) => {
  const getExercisesResponse = await serverFetch.get("/exercises");

  return NextResponse.json(getExercisesResponse.data);
});

const completeExercise = createRequest(async (request, serverFetch) => {
  const body = await request.json();

  const completeExerciseResponse = await serverFetch.post(
    "/exercises/complete",
    body,
  );

  return NextResponse.json(completeExerciseResponse.data);
});

export const ExercisesRoutes = {
  GET: getExercises,
  POST: completeExercise,
};
