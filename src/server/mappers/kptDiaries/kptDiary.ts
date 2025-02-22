import {
  type GetKptDiariesApiResponseData,
  type GetKptDiariesResponseData,
  type GetKptDiaryApiResponseData,
  type GetKptDiaryResponseData,
  type SendKptDiaryApiRequestData,
  type SendKptDiaryRequestData,
} from "@/shared/types";

export const mapGetKptDiariesResponse = (
  data: GetKptDiariesApiResponseData,
): GetKptDiariesResponseData => {
  return data.map(({ id, situation, created_at }) => ({
    id,
    situation,
    createdAt: created_at,
  }));
};

export const mapSendKptDiaryRequest = (
  data: SendKptDiaryRequestData,
): SendKptDiaryApiRequestData => {
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

export const mapGetKptDiaryResponse = (
  data: GetKptDiaryApiResponseData,
): GetKptDiaryResponseData => {
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
