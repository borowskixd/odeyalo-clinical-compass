import {
  type GetDiaryApiResponseData,
  type GetDiaryResponseData,
  type SendReadingThinkApiRequestData,
  type GetReadingThinkApiResponseData,
  type SendReadingThinkRequestData,
  type GetReadingThinkResponseData,
  type SendWritingThinkApiRequestData,
  type SendWritingThinkRequestData,
} from "@/shared/types";

export const mapGetDiaryResponse = (
  data: GetDiaryApiResponseData,
): GetDiaryResponseData => {
  return data.map(({ id, situation, created_at }) => ({
    id,
    situation,
    createdAt: created_at,
  }));
};

export const mapWritingThinkDiaryRequest = (
  data: SendWritingThinkRequestData,
): SendWritingThinkApiRequestData => {
  const {
    situation,
    mood,
    moodLevel,
    thoughts,
    confirmThoughts,
    refuteThoughts,
    newMood,
    newThoughts,
    newMoodLevel,
    behavior,
  } = data;

  return {
    situation,
    mood,
    level: moodLevel,
    auto_thought: thoughts,
    proofs: confirmThoughts,
    refutations: refuteThoughts,
    new_mood: newMood,
    alternative_thought: newThoughts,
    new_level: newMoodLevel,
    behavioral: behavior,
  };
};

export const mapReadingThinkDiaryRequest = (
  data: SendReadingThinkRequestData,
): SendReadingThinkApiRequestData => {
  const { id } = data;
  return {
    think_diary_id: id,
  };
};

export const mapReadingThinkDiaryResponse = (
  data: GetReadingThinkApiResponseData,
): GetReadingThinkResponseData => {
  const {
    situation,
    mood,
    level,
    auto_thought,
    proofs,
    refutations,
    new_mood,
    alternative_thought,
    new_level,
    behavioral,
    created_at,
  } = data;
  return {
    situation,
    mood,
    moodLevel: level,
    thoughts: auto_thought,
    confirmThoughts: proofs,
    refuteThoughts: refutations,
    newMood: new_mood,
    newThoughts: alternative_thought,
    newMoodLevel: new_level,
    behavior: behavioral,
    createdAt: created_at,
  };
};
