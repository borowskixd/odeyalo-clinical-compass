import { type AccessRole } from "@/shared/config/access";

export interface UpdateUserRequestData {
  username: string;
  role: AccessRole;
}

export interface UpdateUserApiRequestData {
  birth_date: string;
  gender: string;
  username: string;
  request: number[];
  city: string;
  description: string;
  department: string;
  type: number;
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
