import { NextResponse } from "next/server";
import { mapGetTrainingExerciseResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetTrainingExerciseApiResponseData,
  ResponseSuccessInfo,
} from "@/shared/types";

const getTrainingExercise = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const getExerciseResponse =
      await serverFetch.get<GetTrainingExerciseApiResponseData>(
        `/training-exercises/${id}`,
      );

    const responseData = mapGetTrainingExerciseResponse(
      getExerciseResponse.data,
    );

    return NextResponse.json(responseData, httpStatuses.ok);
  },
);

const completeTrainingExercise = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    await serverFetch.post(`/training-exercises/${id}/complete`);

    return NextResponse.json(new ResponseSuccessInfo(), httpStatuses.created);
  },
);

export const TrainingExerciseRoutes = {
  GET: getTrainingExercise,
  POST: completeTrainingExercise,
};
