export type SaveMoodRequestData = {
  score: number;
  date: string;
  freeDiaryId?: string;
  thinkDiaryId?: string;
  diaryType?: number;
};

export type SaveMoodApiRequestData = {
  score: number;
  day: string;
};

export type GetMoodResponseData = {
  id: string;
  userId: string;
  score: number;
  date: string;
  freeDiaryId: string | null;
  thinkDiaryId: string | null;
  diaryType: number | null;
};

export type GetMoodApiResponseData = {
  id: string;
  user_id: string;
  score: number;
  date: string;
  free_diary_id: string | null;
  think_diary_id: string | null;
  diary_type: number | null;
};
