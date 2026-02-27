import { type GetTaskApiResponseData, type GetTaskResponseData } from "./task";

export type CreateTaskRequestData = {
  task: string;
};

export type CreateTaskApiRequestData = {
  text: string;
};

export type GetTasksResponseData = {
  completed: Record<string, GetTaskResponseData[]>;
  uncompleted: Record<string, GetTaskResponseData[]>;
};

export type GetTasksApiResponseData = GetTaskApiResponseData[];
