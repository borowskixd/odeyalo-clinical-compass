import { NextResponse } from "next/server";
import { createRequest } from "@/server/utils";
import { type GetExerciseStructureApiResponseData } from "@/shared/types";

const getExerciseStructure = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseStructureResponse =
      await serverFetch.get<GetExerciseStructureApiResponseData>(
        `/exercises/${id}/structure`,
      );

    return NextResponse.json(getExerciseStructureResponse.data);
  },
);

export const ExerciseStructureRoutes = {
  GET: getExerciseStructure,
};
