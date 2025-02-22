export type GetKptDiariesApiResponseData = {
  id: string;
  situation: string;
  created_at: string;
}[];

export type GetKptDiariesResponseData = {
  id: string;
  situation: string;
  createdAt: string;
}[];

export interface SendKptDiaryRequestData {
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

export interface SendKptDiaryApiRequestData {
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

export interface GetKptDiaryApiResponseData extends SendKptDiaryApiRequestData {
  created_at: string;
}

export interface GetKptDiaryResponseData extends SendKptDiaryRequestData {
  createdAt: string;
}
