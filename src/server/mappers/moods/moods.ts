import {
  type GetMoodsApiResponseData,
  type GetMoodsResponseData,
} from "@/shared/types";

export const mapGetMoodsResponse = (
  data: GetMoodsApiResponseData,
): GetMoodsResponseData => {
  return data.map((mood) => {
    const {
      id,
      diary_type,
      free_diary_id,
      think_diary_id,
      score,
      user_id,
      date,
    } = mood;
    return {
      id,
      userId: user_id,
      date,
      score,
      diaryType: diary_type,
      freeDiaryId: free_diary_id,
      thinkDiaryId: think_diary_id,
    };
  });
};
