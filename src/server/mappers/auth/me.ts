import {
  type GetMeApiResponseData,
  type GetMeResponseData,
} from "@/shared/types";

export const mapGetMeResponse = (
  data: GetMeApiResponseData,
): GetMeResponseData => {
  const {
    id,
    email,
    city,
    company,
    online,
    gender,
    birth_date,
    phone_number,
    description,
    username,
    is_active,
    face_to_face,
    department,
  } = data;

  return {
    id,
    email,
    city,
    company,
    online,
    gender,
    phoneNumber: phone_number,
    birthDate: birth_date,
    description,
    username,
    isActive: is_active,
    faceToFace: face_to_face,
    department,
  };
};
