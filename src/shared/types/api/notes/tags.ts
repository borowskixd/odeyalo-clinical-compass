export type GetMoodTagApiResponseData = {
  id: string;
  title: string;
  allow_custom_text: boolean;
  options: { id: string; title: string }[];
};

export type GetMoodTagResponseData = {
  id: string;
  title: string;
  allowCustomText: boolean;
  options: { id: string; title: string }[];
};

export type GetMoodTagsApiResponseData = GetMoodTagApiResponseData[];

export type GetMoodTagsResponseData = GetMoodTagResponseData[];
