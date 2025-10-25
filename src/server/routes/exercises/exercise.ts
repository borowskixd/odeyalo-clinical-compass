import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";

const getExercise = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseResponse = await serverFetch.get(`/exercises/${id}`);

    return NextResponse.json(getExerciseResponse.data);
  },
);

export const ExerciseRoutes = {
  GET: getExercise,
};
