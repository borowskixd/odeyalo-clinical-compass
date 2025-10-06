export interface GetArticleResponseData {
  title: string;
  id: string;
  linkToPicture: string;
  recommendations: {
    id: string;
    theme: string;
    linkToPicture: string;
    tags: string[];
  }[];
  subtopics: {
    subtitle: string;
    cards: {
      id: string;
      text: string;
      linkToPicture: string;
    }[];
  }[];
}

export type GetArticleApiResponseData = {
  id: string;
  theme: string;
  link: string;
  recommendations: {
    id: string;
    theme: string;
    link: string;
    tags: string[];
  }[];
  education_materials: {
    id: string;
    type: number;
    number: number;
    title: string;
    link_to_picture: string;
    subtitle: string;
    cards: {
      id: string;
      text: string;
      number: number;
      link_to_picture: string;
    }[];
  }[];
};

export type ReadArticleApiRequestData = {
  education_material_id: string;
};
