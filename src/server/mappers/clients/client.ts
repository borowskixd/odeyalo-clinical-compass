import {
  type GetClientApiResponseData,
  type GetClientResponseData,
} from "@/shared/types";
import { calculateAge } from "@/shared/utils";

export const mapGetClientResponse = (
  data: GetClientApiResponseData,
): GetClientResponseData => {
  const { id, username, inquiry, birth_date } = data;

  return {
    userId: id,
    username,
    isOnline: false,
    problems: inquiry,
    profileImage: "",
    age: calculateAge(birth_date),
  };
};
