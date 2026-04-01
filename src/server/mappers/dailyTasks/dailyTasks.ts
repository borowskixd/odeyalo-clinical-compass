import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetDailyTasksApiResponse,
  type GetDailyTasksResponse,
} from "@/shared/types";
import { getDailyTaskType } from "@/shared/utils";

export const mapGetDailyTasksResponse = (
  data: GetDailyTasksApiResponse,
): GetDailyTasksResponse => {
  return data.result.map(({ id, type, destination_id, link_to_picture }) => ({
    id,
    taskType: getDailyTaskType(type),
    taskId: destination_id,
    linkToPicture: `${SEVER_API_URL}${link_to_picture}`,
  }));
};
