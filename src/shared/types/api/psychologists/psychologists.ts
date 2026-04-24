import { GetInquiriesResponseData } from "@/shared/types";

type PsychologistApiResponseData = {
  id: string;
  username: string;
  birth_date: string;
  higher_education_university: string;
  higher_education_specialization: string;
  academic_degree: string;
  courses: string;
  work_format: string;
  association: string;
  inquiries: GetInquiriesResponseData;
};

export type GetPsychologistResponseData = {
  userId: string;
  username: string;
  profileImage: string;
  isOnline: boolean;
  inquiries: GetInquiriesResponseData;
  age: number;
  higherEducationUniversity: string;
  higherEducationSpecialization: string;
  academicDegree: string;
  courses: string;
  workFormat: string;
  association: string;
};

export type GetPsychologistsResponseData = Pick<
  GetPsychologistResponseData,
  "userId" | "username" | "profileImage" | "isOnline" | "inquiries"
>[];

export type GetPsychologistApiResponseData = PsychologistApiResponseData;

export type GetPsychologistsApiResponseData = {
  items: PsychologistApiResponseData[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
};
