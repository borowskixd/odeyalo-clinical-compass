import {
  type GetDiaryApiResponseData,
  type GetDiaryResponseData,
  type ReadingThinkDiaryApiRequestData,
  type ReadingThinkDiaryApiResponseData,
  type ReadingThinkDiaryRequestData,
  type ReadingThinkDiaryResponseData,
  type WritingThinkDiaryApiRequestData,
  type WritingThinkDiaryRequestData,
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
  data: WritingThinkDiaryRequestData,
): WritingThinkDiaryApiRequestData => {
  const {
    situation,
    mood,
    level,
    autoThought,
    proofs,
    refutations,
    newMood,
    alternativeThought,
    newLevel,
    behavioral,
  } = data;

  return {
    situation,
    mood,
    level,
    auto_thought: autoThought,
    proofs,
    refutations,
    new_mood: newMood,
    alternative_thought: alternativeThought,
    new_level: newLevel,
    behavioral,
  };
};

export const mapReadingThinkDiaryRequest = (
  data: ReadingThinkDiaryApiRequestData,
): ReadingThinkDiaryRequestData => {
  const { think_diary_id } = data;
  return {
    thinkDiaryId: think_diary_id,
  };
};

export const mapReadingThinkDiaryResponse = (
  data: ReadingThinkDiaryApiResponseData,
): ReadingThinkDiaryResponseData => {
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
    level,
    autoThought: auto_thought,
    proofs,
    refutations,
    newMood: new_mood,
    alternativeThought: alternative_thought,
    newLevel: new_level,
    behavioral,
    createdAt: created_at,
  };
};
