export type GetDiaryApiResponseData = {
  id: string;
  situation: string;
  created_at: string;
}[];

export type GetDiaryResponseData = {
  id: string;
  situation: string;
  createdAt: string;
}[];

export interface SendWritingThinkRequestData {
  situation: string;
  mood: string;
  moodLevel: 0;
  thoughts: string;
  confirmThoughts: string;
  refuteThoughts: string;
  newMood: string;
  newThoughts: string;
  newMoodLevel: 0;
  behavior: string;
}

export interface SendWritingThinkApiRequestData {
  situation: string;
  mood: string;
  level: 0;
  auto_thought: string;
  proofs: string;
  refutations: string;
  new_mood: string;
  alternative_thought: string;
  new_level: 0;
  behavioral: string;
}

export type SendReadingThinkApiRequestData = {
  think_diary_id: string;
};

export type SendReadingThinkRequestData = {
  id: string;
};

export interface GetReadingThinkApiResponseData
  extends SendWritingThinkApiRequestData {
  created_at: string;
}

export interface GetReadingThinkResponseData
  extends SendWritingThinkRequestData {
  createdAt: string;
}
