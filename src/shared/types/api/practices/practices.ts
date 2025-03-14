export type GetPracticesResponseData = {
  id: string;
  title: string;
  description: string;
  image: string;
  available: boolean;
}[];

export type GetPracticesApiResponseData = {
  id: string;
  title: string;
  description: string;
  link_to_picture: string;
  linked_exercise_id: null | string;
  closed: boolean;
}[];
