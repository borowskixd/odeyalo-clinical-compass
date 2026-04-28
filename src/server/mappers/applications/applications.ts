import {
  type GetApplicationsApiResponseData,
  type GetApplicationsResponseData,
  type SendApplicationApiRequestData,
  type SendApplicationRequestData,
} from "@/shared/types";

export const mapGetApplicationsResponse = (
  data: GetApplicationsApiResponseData,
): GetApplicationsResponseData => {
  return data
    .filter((el) => !el.status)
    .map((el) => {
      const { id, client_id, status, text, inquiry } = el;

      return {
        id,
        userId: client_id,
        username: "",
        isOnline: status,
        problem: text,
        profileImage: "",
        inquiry,
      };
    });
};

export const mapSendApplicationRequest = (
  data: SendApplicationRequestData,
): SendApplicationApiRequestData => {
  const { psychologistId, request, inquiry } = data;

  return {
    manager_id: psychologistId,
    text: request,
    inquiry,
  };
};
