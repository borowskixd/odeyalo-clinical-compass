import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetArticlesApiResponseData,
  type GetArticlesResponseData,
} from "@/shared/types";

export const mapGetArticlesResponse = (
  data: GetArticlesApiResponseData,
): GetArticlesResponseData => {
  return data.map((el) => {
    const { id, theme, score, max_score, link_to_picture } = el;

    return {
      id,
      title: theme,
      progress: score,
      fullProgress: max_score,
      image: `${SEVER_API_URL}${link_to_picture}`,
    };
  });
};
