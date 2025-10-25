import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { type GetExerciseApiResponseData } from "@/shared/types";

const getExercise = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseResponse =
      await serverFetch.get<GetExerciseApiResponseData>(`/exercises/${id}`);

    return NextResponse.json(getExerciseResponse.data);
  },
);

export const ExerciseRoutes = {
  GET: getExercise,
};
