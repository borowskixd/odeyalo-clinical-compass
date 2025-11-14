import { type AccessRole } from "@/shared/config/access";

export interface UpdateUserRequestData {
  username: string;
  birthday: string | null;
  gender: "male" | "female" | null;
  city: string | null;
}

export interface UpdateUserApiRequestData {
  birth_date: string | null;
  gender: string;
  username: string;
  city: string;
  description: string;
  company: string;
  phone_number: string;
  online: boolean;
}

export interface GetUserApiResponseData {
  id: string;
  email: string;
  birth_date: string;
  gender: string;
  username: string;
  city: string;
  description: string | null;
  department: string | null;
  company: string | null;
  online: boolean | null;
  phone_number: "";
  is_active: boolean | null;
  face_to_face: boolean | null;
  role_id: number;
}

export interface GetUserResponseData {
  username: string;
  role: AccessRole;
}
