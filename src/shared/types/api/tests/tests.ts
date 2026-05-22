export type GetTestsApiResponseData = {
  id: string;
  title: string;
  description: string;
  short_desc: string;
  link: string;
}[];

export type GetUserPassedTestsApiResponseData = {
  test_id: string;
  title: string;
  description: string;
  link: string;
}[];

export type GetTestsResponseData = {
  id: string;
  title: string;
  description: string;
  image: string;
}[];
