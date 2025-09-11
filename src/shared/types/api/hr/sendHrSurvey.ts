export interface SendHrSurveyRequestData {
  username: string;
  company: string;
}

export interface SendHrSurveyApiRequestData {
  username: string;
  description: string;
  city: string;
  company: string;
  online: boolean;
  gender: string;
  birth_date: string;
  is_active: boolean;
  department: string;
  face_to_face: boolean;
}
