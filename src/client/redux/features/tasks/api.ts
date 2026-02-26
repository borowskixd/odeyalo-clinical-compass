import { api } from "../../api";
import {
  type CreateTaskRequestData,
  type GetTasksResponseData,
  type ResponseSuccessInfo,
  UpdateTaskRequestData,
} from "@/shared/types";

const tasksApi = api.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTasks: builder.query<GetTasksResponseData, void>({
        query: () => `/tasks`,
        providesTags: ["Auth", "Tasks"],
      }),
      createTask: builder.mutation<ResponseSuccessInfo, CreateTaskRequestData>({
        query: (body) => ({
          url: "/tasks",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Tasks"],
      }),
      updateTask: builder.mutation<
        ResponseSuccessInfo,
        UpdateTaskRequestData & { taskId: string }
      >({
        query: ({ taskId, ...body }) => ({
          url: `/tasks/${taskId}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Tasks"],
      }),
      deleteTask: builder.mutation<ResponseSuccessInfo, string>({
        query: (taskId) => ({
          url: `/tasks/${taskId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Tasks"],
      }),
    };
  },
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
