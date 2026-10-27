import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetTestsApiResponseData,
  type GetTestsResponseData,
  type GetUserPassedTestsApiResponseData,
} from "@/shared/types";

export const mapGetTestsResponse = (
  data: GetTestsApiResponseData,
): GetTestsResponseData => {
  return data.map((el) => {
    const { id, short_desc, description, link } = el;

    return {
      id,
      title: short_desc,
      description,
      image: `${SEVER_API_URL}${link}`,
    };
  });
};

export const mapGetUserPassedTestsResponse = (
  data: GetUserPassedTestsApiResponseData,
): GetTestsResponseData => {
  return data.map((el) => {
    const { test_id, title, description, link } = el;

    return {
      id: test_id,
      title,
      description,
      image: `${SEVER_API_URL}${link}`,
    };
  });
};
