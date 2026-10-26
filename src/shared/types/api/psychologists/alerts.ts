export interface PsychologistAlertApiData {
  client_id: string;
  client_name: string;
  test_id: string;
  test_title: string;
  test_result_id: string;
  date: string;
}

export type GetPsychologistAlertsApiResponseData = PsychologistAlertApiData[];

export type GetPsychologistAlertsResponseData = {
  clientId: string;
  clientName: string;
  testId: string;
  testTitle: string;
  testResultId: string;
  date: string;
}[];
