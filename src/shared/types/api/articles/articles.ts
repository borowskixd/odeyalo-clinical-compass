export type GetArticlesResponseData = {
  id: string;
  title: string;
  progress: number;
  fullProgress: number;
  image: string;
}[];

export type GetArticlesApiResponseData = {
  id: string;
  theme: string;
  score: number;
  max_score: number;
  link_to_picture: string;
}[];
