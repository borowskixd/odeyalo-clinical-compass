export type GetArticlesResponseData = {
  id: string;
  theme: string;
  link: string;
  tags: string[];
  educationMaterials: {
    id: string;
    typeScore: number;
    number: number;
    title: string;
    pictureLink: string;
    subtitle: string;
    cards: {
      id: string;
      text: string;
      number: number;
      pictureLink: string;
    }[];
  }[];
}[];

export type GetArticlesApiResponseData = {
  id: string;
  theme: string;
  link: string;
  link_to_picture: string;
  tags: string[];
  education_materials: {
    id: string;
    type_score: number;
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
}[];
