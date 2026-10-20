import {
  type GetMoodTagApiResponseData,
  type GetMoodTagResponseData,
} from "@/shared/types";

export const mapGetMoodTagResponse = (
  data: GetMoodTagApiResponseData,
): GetMoodTagResponseData => {
  const { id, title, allow_custom_text, options } = data;

  return {
    id,
    title,
    allowCustomText: allow_custom_text,
    options: options.map((o) => ({ id: o.id, title: o.title })),
  };
};
