export type GetApplicationResponseData = {
  id: string;
  userId: string;
  username: string;
  age: number;
  isOnline: boolean;
  problem: string;
  profileImage: string;
};

export type GetApplicationApiResponseData = {
  id: string;
  client_id: string;
  manager_id: string;
  text: string;
  status: true;
  created_at: string;
  inquiry: [];
};
