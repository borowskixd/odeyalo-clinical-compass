import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetPracticesApiResponseData,
  type GetPracticesResponseData,
} from "@/shared/types";

export const mapGetPracticesResponse = (
  data: GetPracticesApiResponseData,
): GetPracticesResponseData => {
  return data.map((el) => {
    const { id, title, closed, link_to_picture, description } = el;

    return {
      id,
      title,
      description,
      image: `${SEVER_API_URL}${link_to_picture}`,
      available: !closed,
    };
  });
};
