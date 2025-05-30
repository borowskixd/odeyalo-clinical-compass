//import { type AccessRole } from "@/shared/config/access";

export interface LoginRequestData {
  email: string;
  password: string;
}

export interface LoginApiRequestData {
  email: string;
  password: string;
}

export interface LoginResponseData {
  id: string;
  email: string;
  username: string;
  birthDate: string;
  gender: string;
  city: string;
  phoneNumber: string;
}

export interface LoginApiResponseData {
  access_token: string;
}
