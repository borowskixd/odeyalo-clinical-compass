import {
  DeleteTaskApiRequestData,
  GetTaskApiResponseData,
  GetTaskResponseData,
  UpdateTaskApiRequestData,
  UpdateTaskRequestData,
} from "@/shared/types";
import { mapDateToApiDateFormat } from "@/shared/utils";

export const mapGetTaskResponse = (
  data: GetTaskApiResponseData,
): GetTaskResponseData => {
  const { text, id, created_at, is_complete } = data;

  return {
    id,
    task: text,
    date: mapDateToApiDateFormat(new Date(created_at)),
    completed: is_complete,
  };
};

export const mapUpdateTaskRequest = (
  data: UpdateTaskRequestData,
  taskId: string,
): UpdateTaskApiRequestData => {
  const { task, completed } = data;

  return {
    user_task_id: taskId,
    text: task,
    is_complete: completed,
  };
};

export const mapDeleteTaskRequest = (
  taskId: string,
): DeleteTaskApiRequestData => {
  return {
    user_task_id: taskId,
  };
};
