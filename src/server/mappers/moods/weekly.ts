import {
  type GetWeeklyMoodsApiResponseData,
  type GetWeeklyMoodsResponseData,
} from "@/shared/types";

export const mapGetWeeklyMoodsResponse = (
  data: GetWeeklyMoodsApiResponseData,
): GetWeeklyMoodsResponseData => {
  return data.map((day) => ({
    date: day.date,
    weekday: day.weekday,
    moodTrackers: day.mood_trackers.map((tracker) => ({
      id: tracker.id,
      score: tracker.score,
      createdAt: tracker.created_at,
      userId: tracker.user_id,
      emojiIds: tracker.emoji_ids,
      emojiTexts: tracker.emoji_texts,
    })),
  }));
};
