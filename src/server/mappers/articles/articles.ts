import { SEVER_API_URL } from "@/shared/config/api";
import {
  type GetArticlesApiResponseData,
  type GetArticlesResponseData,
} from "@/shared/types";

export const mapGetArticlesResponse = (
  data: GetArticlesApiResponseData,
): GetArticlesResponseData => {
  return data.map((el) => {
    return {
      id: el.id,
      theme: el.theme,
      link: `${SEVER_API_URL}${el.link_to_picture}`,
      tags: el.tags,
      educationMaterials: el.education_materials.map((material) => ({
        id: material.id,
        typeScore: material.type_score,
        number: material.number,
        title: material.title,
        pictureLink: `${SEVER_API_URL}${material.link_to_picture}`,
        subtitle: material.subtitle,
        cards: material.cards.map((card) => ({
          id: card.id,
          text: card.text,
          number: card.number,
          pictureLink: `${SEVER_API_URL}${card.link_to_picture}`,
        })),
      })),
    };
  });
};
