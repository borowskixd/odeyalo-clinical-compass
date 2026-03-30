import {
  type GetWeeklyMoodsApiResponseData,
  type GetWeeklyMoodsResponseData,
} from "@/shared/types";

export const mapGetWeeklyMoodsResponse = (
  data: GetWeeklyMoodsApiResponseData,
): GetWeeklyMoodsResponseData => {
  return data.map((item) => ({
    id: item.id,
    score: item.score,
    userId: item.user_id,
    date: item.created_at.split("T")[0],
    emojis: item.emoji_ids.map((el, index) => ({
      id: el,
      emoji: item.emoji_texts[index],
    })),
  }));
};
