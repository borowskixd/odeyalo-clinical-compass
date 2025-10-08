import {
  type GetClientsApiResponseData,
  type GetClientsResponseData,
} from "@/shared/types";

export const mapGetClientsResponse = (
  data: GetClientsApiResponseData,
): GetClientsResponseData => {
  return data.map((el) => {
    const { id, username, inquiry } = el;

    return {
      userId: id,
      username,
      isOnline: false,
      problems: inquiry,
      profileImage: "",
    };
  });
};
