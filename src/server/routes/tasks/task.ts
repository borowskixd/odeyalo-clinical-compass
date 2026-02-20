import { NextResponse } from "next/server";
import { mapDeleteTaskRequest, mapUpdateTaskRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  DeleteTaskApiRequestData,
  ResponseSuccessInfo,
  UpdateTaskApiRequestData,
  UpdateTaskRequestData,
} from "@/shared/types";

const updateTask = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const body: UpdateTaskRequestData = await request.json();

    await serverFetch.put<void, UpdateTaskApiRequestData>(
      "/user-task/update",
      mapUpdateTaskRequest(body, id),
    );

    return NextResponse.json({
      body: new ResponseSuccessInfo("success"),
      status: httpStatuses.created,
    });
  },
);

const deleteTask = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    await serverFetch.delete<void, DeleteTaskApiRequestData>(
      "/user-task",
      mapDeleteTaskRequest(id),
    );

    return NextResponse.json({
      body: new ResponseSuccessInfo("success"),
      status: httpStatuses.created,
    });
  },
);

export const TaskRoutes = {
  PUT: updateTask,
  DELETE: deleteTask,
};
