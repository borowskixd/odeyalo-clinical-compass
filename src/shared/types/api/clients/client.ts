export type GetClientResponseData = {
  userId: string;
  username: string;
  isOnline: boolean;
  problems: string[];
  age: number;
  gender: string;
  description: string;
  profileImage: string;
};

export type GetClientApiResponseData = {
  id: string;
  username: string;
  birth_date: string;
  text: string;
  gender: string;
  inquiry: string[];
};
