export type GetWeeklyMoodsResponseData = {
  id: string;
  score: number;
  date: string;
  userId: string;
  emojis: {
    id: number;
    emoji: string;
  }[];
}[];

export type GetWeeklyMoodsApiResponseData = {
  id: string;
  score: number;
  created_at: string;
  user_id: string;
  emoji_ids: number[];
  emoji_texts: string[];
}[];
