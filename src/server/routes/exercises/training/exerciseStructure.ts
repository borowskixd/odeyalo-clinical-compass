import { NextResponse } from "next/server";
import { mapGetTrainingExerciseStructureResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import { type GetTrainingExerciseStructureApiResponseData } from "@/shared/types";

const getTrainingExerciseStructure = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getTrainingExerciseStructureResponse =
      await serverFetch.get<GetTrainingExerciseStructureApiResponseData>(
        `/training-exercises/${id}/structure`,
      );

    const responseData = mapGetTrainingExerciseStructureResponse(
      getTrainingExerciseStructureResponse.data,
    );

    return NextResponse.json(responseData, httpStatuses.ok);
  },
);

export const TrainingExerciseStructureRoutes = {
  GET: getTrainingExerciseStructure,
};
