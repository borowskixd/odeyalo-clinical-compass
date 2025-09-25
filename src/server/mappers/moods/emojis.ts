import {
  type GetEmojisApiResponseData,
  type GetEmojisResponseData,
} from "@/shared/types";

export const mapGetEmojisResponse = (
  data: GetEmojisApiResponseData,
): GetEmojisResponseData => {
  return data.map((mood) => {
    const { id, text } = mood;
    return {
      id,
      emoji: text,
    };
  });
};
