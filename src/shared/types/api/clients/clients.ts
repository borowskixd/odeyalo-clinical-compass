export type GetClientsResponseData = {
  userId: string;
  username: string;
  isOnline: boolean;
  problems: string[];
  profileImage: string;
}[];

export type GetClientsApiResponseData = {
  id: string;
  username: string;
  birth_date: string;
  text: string;
  gender: string;
  inquiry: string[];
}[];
