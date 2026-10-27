import {
  type GetTestApiResponseData,
  type GetTestResponseData,
  type TestScaleApiData,
  type TestScaleData,
} from "@/shared/types";

export const mapGetTestScalesResponse = (
  data: TestScaleApiData[],
): TestScaleData[] => {
  return data.map(({ id, test_id, title, min, max, borders }) => ({
    id: id,
    testId: test_id,
    title: title,
    min: min,
    max: max,
    borders: borders
      .map(
        ({
          id,
          right_border,
          title,
          scale_id,
          color,
          left_border,
          user_recommendation,
        }) => ({
          id: id,
          title: title,
          leftBorder: left_border,
          rightBorder: right_border,
          color: color,
          scaleId: scale_id,
          userRecommendation: user_recommendation,
        }),
      )
      .sort((a, b) => a.leftBorder - b.leftBorder),
  }));
};

export const mapGetTestResponse = (
  data: GetTestApiResponseData,
): GetTestResponseData => {
  const { id, short_desc, description, scale, link } = data;

  return {
    id,
    title: short_desc,
    description,
    scales: mapGetTestScalesResponse(scale),
    link,
  };
};
