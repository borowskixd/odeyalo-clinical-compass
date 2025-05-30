import {
  type RegistrationApiRequestData,
  type RegistrationApiResponseData,
  type RegistrationRequestData,
  type RegistrationResponseData,
} from "@/shared/types";
import { getRole } from "@/shared/utils";

export const mapRegistrationRequest = (
  data: RegistrationRequestData,
): RegistrationApiRequestData => {
  const { username, email, password, confirmPassword } = data;

  return {
    username,
    email,
    password,
    confirm_password: confirmPassword,
    gender: "MALE",
    city: "",
    phone_number: "",
    birth_date: "2000-01-01",
  };
};

export const mapRegistrationResponse = (
  data: RegistrationApiResponseData,
): RegistrationResponseData => {
  const {
    email,
    username,
    birth_date,
    gender,
    city,
    phone_number,
    hashed_password,
    id,
  } = data;

  return {
    email,
    username,
    birthDate: birth_date,
    gender,
    city,
    phoneNumber: phone_number,
    hashedPassword: hashed_password,
    roleId: getRole(1),
    id,
  };
};
