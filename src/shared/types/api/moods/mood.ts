export type SaveMoodRequestData = {
  score: number;
  date: string | null;
  emojiIds: number[];
};

export type SaveMoodApiRequestData = {
  score: number;
  day: string | null;
  emoji_ids: number[];
};

export type GetMoodResponseData = {
  id: string;
  score: number;
  userId: string;
  date: string;
  emojis: {
    id: number;
    emoji: string;
  }[];
};

export type GetMoodApiResponseData = {
  id: string;
  score: number;
  created_at: string;
  user_id: string;
  emoji_ids: number[];
  emoji_texts: string[];
};
