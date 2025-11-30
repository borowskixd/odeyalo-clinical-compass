import { type GetWeeklyGamificationScoreResponse } from "@/shared/types";
import { mapDateToApiDateFormat } from "@/shared/utils";

type WeeklyChartData = { day: string; score: number }[];

const mapDayToString = (day: number): string => {
  switch (day) {
    case 0:
      return "ВС";
    case 1:
      return "ПН";
    case 2:
      return "ВТ";
    case 3:
      return "СР";
    case 4:
      return "ЧТ";
    case 5:
      return "ПТ";
    case 6:
      return "СБ";
    default:
      return "";
  }
};

export const mapApiDataToWeeklyChartData = (
  apiData: GetWeeklyGamificationScoreResponse,
): WeeklyChartData => {
  const { scores } = apiData;

  const result: WeeklyChartData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);

    const el = scores.find(
      ({ date: elDate }) => elDate === mapDateToApiDateFormat(date),
    );

    result.push({
      day: mapDayToString(date.getDay()),
      score: el?.score ?? 0,
    });
  }

  return result;
};
