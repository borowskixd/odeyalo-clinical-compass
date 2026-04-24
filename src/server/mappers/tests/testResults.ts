import { mapGetTestScalesResponse } from "./test";
import {
  type GetTestApiResponseData,
  type GetTestResultApiResponseData,
  type GetTestResultResponseData,
  type GetTestResultsApiResponseData,
  type GetTestResultsResponseData,
  type SendTestResultApiRequestData,
  type SendTestResultApiResponseData,
  type SendTestResultRequestData,
  type SendTestResultResponseData,
  type TestResultData,
} from "@/shared/types";
import { mapDatetimeToText } from "@/shared/utils";

export const mapTestResultResponse = (
  data: GetTestResultApiResponseData,
): TestResultData => {
  const { test_result_id, test_id, datetime, scale_results, tags } = data;

  return {
    id: test_result_id,
    testId: test_id,
    datetime: mapDatetimeToText(datetime),
    scaleResults: scale_results.map(
      ({ scale_id, score, conclusion, user_recommendation }) => ({
        id: scale_id,
        score,
        conclusion,
        recommendations: user_recommendation,
      }),
    ),
    tags: tags || [],
  };
};

export const mapGetTestResultResponse = (
  testData: GetTestApiResponseData,
  testResultData: GetTestResultApiResponseData,
): GetTestResultResponseData => {
  const { title, scale } = testData;

  return {
    title,
    scales: mapGetTestScalesResponse(scale),
    ...mapTestResultResponse(testResultData),
  };
};

export const mapGetTestResultsResponse = (
  testData: GetTestApiResponseData,
  testResultsData: GetTestResultsApiResponseData,
): GetTestResultsResponseData => {
  const { title, scale } = testData;

  return {
    title: title,
    scales: mapGetTestScalesResponse(scale),
    results: testResultsData.map(mapTestResultResponse),
  };
};

export const mapSendTestResultRequest = (
  data: SendTestResultRequestData,
): SendTestResultApiRequestData => {
  const { testId, answers } = data;

  return {
    test_id: testId,
    date: new Date().toJSON(),
    results: answers,
  };
};

export const mapSendTestResultResponse = (
  data: SendTestResultApiResponseData,
): SendTestResultResponseData => {
  const { test_result_id } = data;

  return {
    testResultId: test_result_id,
  };
};
