import { NextResponse } from "next/server";
import {
  mapGetProblemDefinitionsResponse,
  mapSendProblemDefinitionRequest,
} from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetProblemDefinitionsApiResponseData,
  type GetProblemDefinitionsResponseData,
  ResponseSuccessInfo,
  type SendProblemDefinitionApiRequestData,
  type SendProblemDefinitionRequestData,
} from "@/shared/types";

const sendProblemDefinition = createRequest(async (request, serverFetch) => {
  const body: SendProblemDefinitionRequestData = await request.json();

  await serverFetch.post<any, SendProblemDefinitionApiRequestData>(
    "/defining_problem_groups/save_exercise_result",
    mapSendProblemDefinitionRequest(body),
  );

  return NextResponse.json(
    new ResponseSuccessInfo("success sent"),
    httpStatuses.created,
  );
});

const getProblemDefinitions = createRequest(async (request, serverFetch) => {
  const response = await serverFetch.get<GetProblemDefinitionsApiResponseData>(
    `/defining_problem_groups/get_all_by_user`,
  );

  const data: GetProblemDefinitionsResponseData =
    mapGetProblemDefinitionsResponse(response.data);

  return NextResponse.json(data, httpStatuses.ok);
});

export const ProblemDefinitionsRoutes = {
  POST: sendProblemDefinition,
  GET: getProblemDefinitions,
};
