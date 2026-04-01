// utils.ts
import { type GetWeeklyMoodsResponseData } from "@/shared/types";
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

export const mapMoodsToWeeklyChartData = (
  moodsData: GetWeeklyMoodsResponseData,
): WeeklyChartData => {
  const result: WeeklyChartData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const formattedDate = mapDateToApiDateFormat(date);

    const mood = moodsData.find((item) => item.date === formattedDate);

    result.push({
      day: mapDayToString(date.getDay()),
      score: mood?.score ?? 0,
    });
  }

  return result;
};
