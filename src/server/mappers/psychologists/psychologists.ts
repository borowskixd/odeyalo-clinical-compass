import {
  type GetPsychologistsApiResponseData,
  type GetPsychologistsResponseData,
} from "@/shared/types";

export const mapGetPsychologistsResponse = (
  data: GetPsychologistsApiResponseData,
): GetPsychologistsResponseData => {
  return data.items.map((el) => {
    const { id, username, inquiries } = el;

    return {
      userId: id,
      username,
      isOnline: false,
      profileImage: "",
      inquiries,
    };
  });
};
