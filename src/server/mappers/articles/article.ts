import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetArticleApiResponseData,
  type GetArticleProgressApiResponseData,
  type GetArticleResponseData,
  type ReadArticleApiRequestData,
} from "@/shared/types";

export const mapGetArticleResponse = (
  articleContent: GetArticleApiResponseData,
  articleProgress: GetArticleProgressApiResponseData,
): GetArticleResponseData => {
  const { theme, id, link, recommendations, education_materials } =
    articleContent;

  const readMaterialIds = new Set(
    articleProgress.map((el) => el.education_material_id),
  );

  return {
    title: theme,
    id,
    linkToPicture: `${SEVER_API_URL}${link}`,
    recommendations: recommendations.map((topic) => ({
      id: topic.id,
      theme: topic.theme,
      linkToPicture: `${SEVER_API_URL}${topic.link}`,
      tags: topic.tags,
    })),
    subtopics: education_materials.map((subtopic) => ({
      subtitle: subtopic.subtitle,
      read: readMaterialIds.has(subtopic.id),
      cards: subtopic.cards.map((card) => ({
        id: card.id,
        text: card.text,
        linkToPicture:
          card.link_to_picture === ""
            ? ""
            : `${SEVER_API_URL}${card.link_to_picture}`,
      })),
    })),
  };
};

export const mapReadArticleRequest = (
  id: string,
): ReadArticleApiRequestData => {
  return {
    education_material_id: id,
  };
};
