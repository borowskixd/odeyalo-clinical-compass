import {
  type GetMoodApiResponseData,
  type GetMoodResponseData,
  type SaveMoodApiRequestData,
  type SaveMoodRequestData,
} from "@/shared/types";

export const mapSaveMoodRequest = (
  data: SaveMoodRequestData,
): SaveMoodApiRequestData => {
  const { score, date } = data;

  return {
    score,
    day: date,
  };
};

export const mapGetMoodResponse = (
  data: GetMoodApiResponseData,
): GetMoodResponseData => {
  const {
    id,
    think_diary_id,
    diary_type,
    free_diary_id,
    user_id,
    score,
    date,
  } = data;

  return {
    id,
    diaryType: diary_type,
    date,
    score,
    userId: user_id,
    freeDiaryId: free_diary_id,
    thinkDiaryId: think_diary_id,
  };
};
