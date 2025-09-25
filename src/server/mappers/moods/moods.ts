import {
  type GetMoodsApiResponseData,
  type GetMoodsResponseData,
} from "@/shared/types";

export const mapGetMoodsResponse = (
  data: GetMoodsApiResponseData,
): GetMoodsResponseData => {
  return data.map((mood) => {
    const { id, score, user_id, emoji_ids, emoji_texts, created_at } = mood;
    return {
      id,
      userId: user_id,
      date: created_at,
      score,
      emojis: emoji_ids.map((el, index) => ({
        id: el,
        emoji: emoji_texts[index],
      })),
    };
  });
};
