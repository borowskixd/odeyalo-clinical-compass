import { mapGetTaskResponse } from "./task";
import {
  type CreateTaskApiRequestData,
  type CreateTaskRequestData,
  GetTaskResponseData,
  type GetTasksApiResponseData,
  type GetTasksResponseData,
} from "@/shared/types";

export const mapCreateTaskRequest = (
  data: CreateTaskRequestData,
): CreateTaskApiRequestData => {
  const { task } = data;

  return {
    text: task,
  };
};

export const mapGetTasksResponse = (
  completedTasks: GetTasksApiResponseData,
  uncompletedTasks: GetTasksApiResponseData,
): GetTasksResponseData => {
  const sortTasksByDate = (
    tasks: GetTasksApiResponseData,
  ): Record<string, GetTaskResponseData[]> => {
    return tasks.reduce<Record<string, GetTaskResponseData[]>>((acc, task) => {
      const mappedTask = mapGetTaskResponse(task);

      const { date } = mappedTask;

      if (!acc[date]) acc[date] = [mappedTask];
      else acc[date].push(mappedTask);

      return acc;
    }, {});
  };

  return {
    completed: sortTasksByDate(completedTasks),
    uncompleted: sortTasksByDate(uncompletedTasks),
  };
};
