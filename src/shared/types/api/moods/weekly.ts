export type GetWeeklyMoodsResponseData = {
  date: string;
  weekday: number;
  moodTrackers: {
    id: number;
    score: number;
    createdAt: string;
    userId: string;
    emojiIds: number[];
    emojiTexts: string[];
  }[];
}[];

export type GetWeeklyMoodsApiResponseData = {
  date: string;
  weekday: number;
  mood_trackers: {
    id: number;
    score: number;
    created_at: string;
    user_id: string;
    emoji_ids: number[];
    emoji_texts: string[];
  }[];
}[];
