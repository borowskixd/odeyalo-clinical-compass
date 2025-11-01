import { NextResponse } from "next/server";
import { mapGetExerciseResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetExerciseApiResponseData } from "@/shared/types";

const getExercise = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseResponse =
      await serverFetch.get<GetExerciseApiResponseData>(`/exercises/${id}`);

    const responseData = mapGetExerciseResponse(getExerciseResponse.data);

    return NextResponse.json(responseData, httpStatuses.ok);
  },
);

export const ExerciseRoutes = {
  GET: getExercise,
};
