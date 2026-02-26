import { NextResponse } from "next/server";
import { mapCreateTaskRequest, mapGetTasksResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type CreateTaskApiRequestData,
  type CreateTaskRequestData,
  type GetTasksApiResponseData,
  ResponseSuccessInfo,
} from "@/shared/types";

const createTask = createRequest(async (request, serverFetch) => {
  const body: CreateTaskRequestData = await request.json();

  await serverFetch.post<any, CreateTaskApiRequestData>(
    "/user-task",
    mapCreateTaskRequest(body),
  );

  return NextResponse.json({
    body: new ResponseSuccessInfo("success"),
    status: httpStatuses.created,
  });
});

const getTasks = createRequest(async (request, serverFetch) => {
  const { data: completedTasks } =
    await serverFetch.get<GetTasksApiResponseData>(`/user-task/completed`);
  const { data: uncompletedTasks } =
    await serverFetch.get<GetTasksApiResponseData>(`/user-task/actual`);

  return NextResponse.json(
    mapGetTasksResponse(completedTasks, uncompletedTasks),
  );
});

export const TasksRoutes = {
  POST: createTask,
  GET: getTasks,
};
