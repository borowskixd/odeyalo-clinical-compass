export type GetApplicationsResponseData = {
  id: string;
  userId: string;
  username: string;
  isOnline: boolean;
  problem: string;
  profileImage: string;
}[];

export type GetApplicationsApiResponseData = {
  id: string;
  client_id: string;
  manager_id: string;
  text: string;
  status: true;
  inquiry: number[];
  created_at: string;
}[];

export interface SendApplicationRequestData {
  psychologistId: string;
  request: string;
}

export interface SendApplicationApiRequestData {
  manager_id: string;
  text: string;
  inquiry: number[];
}
