import {
  type LoginApiRequestData,
  type LoginRequestData,
  type LoginResponseData,
  type UserApiResponseData,
} from "@/shared/types";
//import { getRole } from "@/shared/utils";

export const mapLoginRequest = (
  data: LoginRequestData,
): LoginApiRequestData => {
  const { email, password } = data;

  return {
    email,
    password,
  };
};

export const mapLoginResponse = (
  data: UserApiResponseData,
): LoginResponseData => {
  const { id, username, email, city, gender, birth_date, phone_number } = data;

  return {
    id,
    email,
    username,
    birthDate: birth_date,
    gender,
    city,
    phoneNumber: phone_number,
  };
};
