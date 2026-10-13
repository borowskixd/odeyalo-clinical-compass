export type GetEmotionsApiResponseData = {
  groups: {
    id: string;
    title: string;
    emotions: string[];
  }[];
  allow_custom_text: boolean;
  custom_title: string;
};

export type EmotionGroup = {
  id: string;
  title: string;
  emotions: string[];
};

export type GetEmotionsResponseData = {
  groups: EmotionGroup[];
  allowCustomText: boolean;
  customTitle: string;
};
