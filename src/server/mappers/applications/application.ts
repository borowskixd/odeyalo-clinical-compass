import {
  type GetApplicationApiResponseData,
  type GetApplicationResponseData,
} from "@/shared/types";
import { calculateAge } from "@/shared/utils";

export const mapGetApplicationResponse = (
  data: GetApplicationApiResponseData,
): GetApplicationResponseData => {
  const { id, client_id, status, text } = data;

  return {
    id,
    userId: client_id,
    username: "",
    age: calculateAge("2000-01-01"),
    isOnline: status,
    problem: text,
    profileImage: "",
  };
};
