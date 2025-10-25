import { NextResponse } from "next/server";
import { mapGetExerciseStructureResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetExerciseStructureApiResponseData } from "@/shared/types";

const getExerciseStructure = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseStructureResponse =
      await serverFetch.get<GetExerciseStructureApiResponseData>(
        `/exercises/${id}/structure`,
      );

    const responseData = mapGetExerciseStructureResponse(
      getExerciseStructureResponse.data,
    );

    return NextResponse.json(responseData, httpStatuses.ok);
  },
);

export const ExerciseStructureRoutes = {
  GET: getExerciseStructure,
};
