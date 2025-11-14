import {
  type UpdateUserApiRequestData,
  type UpdateUserRequestData,
} from "@/shared/types";

export const mapUpdateUserRequest = (
  data: UpdateUserRequestData,
): UpdateUserApiRequestData => {
  const { username, gender, city, birthday } = data;

  return {
    birth_date: birthday,
    gender: gender ?? "",
    username,
    city: city ?? "",
    description: "",
    company: "",
    online: false,
    phone_number: "",
  };
};
