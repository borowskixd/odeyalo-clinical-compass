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

export interface WritingThinkDiaryRequestData {
  situation: string;
  mood: string;
  level: 0;
  autoThought: string;
  proofs: string;
  refutations: string;
  newMood: string;
  alternativeThought: string;
  newLevel: 0;
  behavioral: string;
}

export interface WritingThinkDiaryApiRequestData {
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

export type ReadingThinkDiaryApiRequestData = {
  think_diary_id: string;
};

export type ReadingThinkDiaryRequestData = {
  thinkDiaryId: string;
};

export interface ReadingThinkDiaryApiResponseData
  extends WritingThinkDiaryApiRequestData {
  created_at: string;
}

export interface ReadingThinkDiaryResponseData
  extends WritingThinkDiaryRequestData {
  createdAt: string;
}
