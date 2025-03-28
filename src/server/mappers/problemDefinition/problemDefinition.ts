import {
  type GetProblemDefinitionApiResponseData,
  type GetProblemDefinitionResponseData,
  type GetProblemDefinitionsApiResponseData,
  type GetProblemDefinitionsResponseData,
  type SendProblemDefinitionApiRequestData,
  type SendProblemDefinitionRequestData,
} from "@/shared/types";

export const mapGetProblemDefinitionsResponse = (
  data: GetProblemDefinitionsApiResponseData,
): GetProblemDefinitionsResponseData => {
  return data.map(({ id, time, sphere }) => ({
    id,
    sphere,
    createdAt: time,
  }));
};

export const mapSendProblemDefinitionRequest = (
  data: SendProblemDefinitionRequestData,
): SendProblemDefinitionApiRequestData => {
  const { emotion, sphere, target } = data;

  return {
    sphere,
    emotion,
    target,
  };
};

export const mapGetProblemDefinitionResponse = (
  data: GetProblemDefinitionApiResponseData,
): GetProblemDefinitionResponseData => {
  const { id, sphere, target, emotion, time } = data;
  return {
    id,
    sphere,
    target,
    emotion,
    createdAt: time,
  };
};
