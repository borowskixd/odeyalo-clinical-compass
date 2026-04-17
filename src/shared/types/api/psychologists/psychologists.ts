import { GetInquiriesResponseData } from "@/shared/types";

export type GetPsychologistsResponseData = {
  userId: string;
  username: string;
  profileImage: string;
  isOnline: boolean;
  inquiries: GetInquiriesResponseData;
}[];

export type GetPsychologistsApiResponseData = {
  items: {
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
  }[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
};
