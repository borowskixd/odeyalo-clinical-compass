import {
  type LoginApiRequestData,
  type LoginRequestData,
} from "@/shared/types";

export const mapLoginRequest = (
  data: LoginRequestData,
): LoginApiRequestData => {
  const { email, password } = data;

  return {
    email,
    password,
  };
};
