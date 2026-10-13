import {
  type GetEmotionsApiResponseData,
  type GetEmotionsResponseData,
} from "@/shared/types";

export const mapGetEmotionsResponse = (
  data: GetEmotionsApiResponseData,
): GetEmotionsResponseData => {
  const { groups, allow_custom_text, custom_title } = data;

  return {
    groups,
    allowCustomText: allow_custom_text,
    customTitle: custom_title,
  };
};
