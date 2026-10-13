import {
  type GetMoodApiResponseData,
  type GetMoodResponseData,
  type SaveMoodApiRequestData,
  type SaveMoodRequestData,
} from "@/shared/types";

export const mapSaveMoodRequest = (
  data: SaveMoodRequestData,
): SaveMoodApiRequestData => {
  const { score, date, emojiIds, emotions, otherEmotion, influenceFactors } =
    data;

  return {
    score,
    day: date,
    emoji_ids: emojiIds,
    emotions,
    other_emotion: otherEmotion,
    influence_factors: influenceFactors.map((factor) => ({
      category_id: factor.categoryId,
      option_ids: factor.optionIds,
      custom_text: factor.customText ?? "",
    })),
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
