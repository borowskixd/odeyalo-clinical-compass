import {
  type GetArticleApiResponseData,
  type GetArticleResponseData,
  type ReadArticleApiRequestData,
} from "@/shared/types";

export const mapGetArticleResponse = (
  articleContent: GetArticleApiResponseData,
): GetArticleResponseData => {
  const { subtopics, theme } = articleContent;

  return {
    title: theme,
    content: subtopics.reduce((acc: GetArticleResponseData["content"], el) => {
      const { cards } = el;

      cards.forEach((el) => {
        const { id, text } = el;

        acc.push({
          id,
          content: text,
        });
      });

      return acc;
    }, []),
  };
};

export const mapReadArticleRequest = (
  id: string,
): ReadArticleApiRequestData => {
  return {
    education_material_id: id,
  };
};
