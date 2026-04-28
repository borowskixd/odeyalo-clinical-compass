export type GetApplicationsResponseData = {
  id: string;
  userId: string;
  username: string;
  isOnline: boolean;
  problem: string;
  profileImage: string;
  inquiry: number[];
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
  inquiry: number[];
}

export interface SendApplicationApiRequestData {
  manager_id: string;
  text: string;
  inquiry: number[];
}
