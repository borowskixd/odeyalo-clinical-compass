import {
  type GetMoodApiResponseData,
  type GetMoodResponseData,
  type SaveMoodApiRequestData,
  type SaveMoodRequestData,
} from "@/shared/types";

export const mapSaveMoodRequest = (
  data: SaveMoodRequestData,
): SaveMoodApiRequestData => {
  const { score, date, emojiIds } = data;

  return {
    score,
    emoji_ids: emojiIds,
    day: date,
  };
};

export const mapGetMoodResponse = (
  data: GetMoodApiResponseData,
): GetMoodResponseData => {
  const { id, emoji_ids, emoji_texts, user_id, score, created_at } = data;

  return {
    id,
    date: created_at,
    score,
    userId: user_id,
    emojis: emoji_ids.map((el, index) => {
      return {
        id: el,
        emoji: emoji_texts[index],
      };
    }),
  };
};
