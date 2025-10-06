import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetTestsApiResponseData,
  type GetTestsResponseData,
} from "@/shared/types";

export const mapGetTestsResponse = (
  data: GetTestsApiResponseData,
): GetTestsResponseData => {
  return data.map((el) => {
    const { id, title, description, link } = el;

    return {
      id,
      title,
      description,
      image: `${SEVER_API_URL}${link}`,
    };
  });
};
