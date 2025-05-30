import { type AccessRole } from "@/shared/config/access";

export interface RegistrationRequestData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationApiRequestData {
  email: string;
  username: string;
  birth_date: string;
  gender: string;
  city: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

export interface RegistrationResponseData {
  email: string;
  username: string;
  birthDate: string;
  gender: string;
  city: string;
  phoneNumber: string;
  hashedPassword: string;
  roleId: AccessRole;
  id: string;
}

export interface RegistrationApiResponseData {
  email: string;
  username: string;
  birth_date: string;
  gender: string;
  city: string;
  phone_number: string;
  hashed_password: string;
  role_id: number;
  id: string;
}
