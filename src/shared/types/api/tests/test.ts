export interface TestBorderApiData {
  id: string;
  title: string;
  left_border: number;
  right_border: number;
  color: string;
  user_recommendation: string;
  scale_id: string;
}

export interface TestScaleApiData {
  id: string;
  test_id: string;
  title: string;
  min: number;
  max: number;
  borders: TestBorderApiData[];
}

export interface GetTestApiResponseData {
  id: string;
  description: string;
  link: string;
  title: string;
  short_desc: string;
  scale: TestScaleApiData[];
}

export interface TestBorderData {
  id: string;
  title: string;
  leftBorder: number;
  rightBorder: number;
  color: string;
  userRecommendation: string;
  scaleId: string;
}

export interface TestScaleData {
  id: string;
  testId: string;
  title: string;
  min: number;
  max: number;
  borders: TestBorderData[];
}

export interface GetTestResponseData {
  id: string;
  description: string;
  link: string;
  title: string;
  scales: TestScaleData[];
}
