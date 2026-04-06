export type GetTaskResponseData = {
  id: string;
  task: string;
  date: string;
  completed: boolean;
};

export type GetTaskApiResponseData = {
  id: string;
  text: string;
  completed_at?: string;
  created_at: string;
  is_complete: boolean;
  user_id: string;
};

export type UpdateTaskRequestData = {
  task: string;
  completed: boolean;
};

export type UpdateTaskApiRequestData = {
  user_task_id: string;
  text: string;
  is_complete: boolean;
};

export type DeleteTaskApiRequestData = {
  user_task_id: string;
};
