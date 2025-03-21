import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetArticleApiResponseData,
  type GetArticleResponseData,
  type ReadArticleApiRequestData,
} from "@/shared/types";

export const mapGetArticleResponse = (
  articleContent: GetArticleApiResponseData,
): GetArticleResponseData => {
  const { theme, id, link_to_picture, related_topics, subtopics } =
    articleContent;

  return {
    title: theme,
    id,
    linkToPicture: `${SEVER_API_URL}${link_to_picture}`,
    recomendations: related_topics.map((topic) => ({
      id: topic.id,
      theme: topic.theme,
      linkToPicture: `${SEVER_API_URL}${topic.link_to_picture}`,
      maxScore: topic.max_score,
    })),
    subtopics: subtopics.map((subtopic) => ({
      subtitle: subtopic.subtitle,
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
