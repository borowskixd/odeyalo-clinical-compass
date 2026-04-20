import {
  type GetPsychologistApiResponseData,
  type GetPsychologistResponseData,
  type GetPsychologistsApiResponseData,
  type GetPsychologistsResponseData,
} from "@/shared/types";
import { calculateAge } from "@/shared/utils";

const mapPsychologistBaseResponse = (
  data: GetPsychologistApiResponseData,
): GetPsychologistsResponseData[number] => {
  const { id, username, inquiries } = data;

  return {
    userId: id,
    username,
    isOnline: false,
    profileImage: "",
    inquiries,
  };
};

export const mapGetPsychologistsResponse = (
  data: GetPsychologistsApiResponseData,
): GetPsychologistsResponseData => {
  return data.items.map(mapPsychologistBaseResponse);
};

export const mapGetPsychologistResponse = (
  data: GetPsychologistApiResponseData,
): GetPsychologistResponseData => {
  return {
    ...mapPsychologistBaseResponse(data),
    age: calculateAge(data.birth_date),
    higherEducationUniversity: data.higher_education_university ?? "",
    higherEducationSpecialization: data.higher_education_specialization ?? "",
    academicDegree: data.academic_degree ?? "",
    courses: data.courses ?? "",
    workFormat: data.work_format ?? "",
    association: data.association ?? "",
  };
};
