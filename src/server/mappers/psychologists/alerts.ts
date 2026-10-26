import {
  type GetPsychologistAlertsApiResponseData,
  type GetPsychologistAlertsResponseData,
  type PsychologistAlertApiData,
} from "@/shared/types";
import { mapDatetimeToText } from "@/shared/utils";

const mapPsychologistAlertBaseResponse = (
  data: PsychologistAlertApiData,
): GetPsychologistAlertsResponseData[number] => {
  const { client_id, client_name, test_id, test_title, test_result_id, date } =
    data;

  return {
    clientId: client_id,
    clientName: client_name,
    testId: test_id,
    testTitle: test_title,
    testResultId: test_result_id,
    date: mapDatetimeToText(date),
  };
};

export const mapGetPsychologistAlertsResponse = (
  data: GetPsychologistAlertsApiResponseData,
): GetPsychologistAlertsResponseData => {
  return data.map(mapPsychologistAlertBaseResponse);
};
