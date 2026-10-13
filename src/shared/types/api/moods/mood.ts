export type SaveMoodInfluenceFactorApiData = {
  category_id: string;
  option_ids: string[];
  custom_text: string;
};

export type SaveMoodApiRequestData = {
  score: number;
  day: string | null;
  emoji_ids: number[];
  emotions: string[];
  other_emotion: string;
  influence_factors: SaveMoodInfluenceFactorApiData[];
};

export type SaveMoodInfluenceFactorData = {
  categoryId: string;
  optionIds: string[];
  customText: string;
};

export type SaveMoodRequestData = {
  score: number;
  date: string | null;
  emojiIds: number[];
  emotions: string[];
  otherEmotion: string;
  influenceFactors: SaveMoodInfluenceFactorData[];
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
