export type GetProblemDefinitionsApiResponseData = {
  id: string;
  time: string;
  sphere: string;
}[];

export type GetProblemDefinitionsResponseData = {
  id: string;
  createdAt: string;
  sphere: string;
}[];

export interface SendProblemDefinitionRequestData {
  sphere: string;
  emotion: string;
  target: string;
}

export interface SendProblemDefinitionApiRequestData {
  sphere: string;
  emotion: string;
  target: string;
}

export interface GetProblemDefinitionApiResponseData
  extends SendProblemDefinitionApiRequestData {
  id: string;
  time: string;
}

export interface GetProblemDefinitionResponseData
  extends SendProblemDefinitionRequestData {
  id: string;
  createdAt: string;
}
