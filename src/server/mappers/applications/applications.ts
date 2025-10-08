import {
  type GetApplicationsApiResponseData,
  type GetApplicationsResponseData,
  type SendApplicationApiRequestData,
  type SendApplicationRequestData,
} from "@/shared/types";

export const mapGetApplicationsResponse = (
  data: GetApplicationsApiResponseData,
): GetApplicationsResponseData => {
  return data.map((el) => {
    const { id, client_id, status, text } = el;

    return {
      id,
      userId: client_id,
      username: "",
      isOnline: status,
      problem: text,
      profileImage: "",
    };
  });
};

export const mapSendApplicationRequest = (
  data: SendApplicationRequestData,
): SendApplicationApiRequestData => {
  const { psychologistId, request } = data;

  return {
    manager_id: psychologistId,
    text: request,
    inquiry: [],
  };
};
