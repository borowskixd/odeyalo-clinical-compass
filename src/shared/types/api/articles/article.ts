export interface GetArticleResponseData {
  title: string;
  content: {
    id: string;
    content: string;
  }[];
}

export type GetArticleApiResponseData = {
  theme: string;
  id: string;
  max_score: number;
  link_to_picture: string;
  related_topics: {
    id: string;
    theme: string;
    link_to_picture: string;
    max_score: number;
  }[];
  subtopics: {
    subtitle: string;
    cards: {
      id: string;
      text: string;
      link_to_picture: string;
    }[];
  }[];
};

export type ReadArticleApiRequestData = {
  education_material_id: string;
};
