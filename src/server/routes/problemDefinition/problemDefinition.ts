import { NextResponse } from "next/server";
import { mapGetProblemDefinitionResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetProblemDefinitionApiResponseData,
  type GetProblemDefinitionResponseData,
} from "@/shared/types";

const getProblemDefinition = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const response =
      await serverFetch.post<GetProblemDefinitionApiResponseData>(
        `/defining_problem_groups/get_exercise/${id}`,
      );

    const data: GetProblemDefinitionResponseData =
      mapGetProblemDefinitionResponse(response.data);

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const ProblemDefinitionRoutes = {
  GET: getProblemDefinition,
};
