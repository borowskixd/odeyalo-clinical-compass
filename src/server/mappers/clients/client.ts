import {
  type GetClientApiResponseData,
  type GetClientResponseData,
} from "@/shared/types";
import { calculateAge } from "@/shared/utils";

export const mapGetClientResponse = (
  data: GetClientApiResponseData,
): GetClientResponseData => {
  const { id, username, inquiry, birth_date, gender, text } = data;

  return {
    userId: id,
    username,
    isOnline: false,
    problems: inquiry,
    gender,
    description: text,
    profileImage: "",
    age: calculateAge(birth_date),
  };
};
