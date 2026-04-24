import { type GetWeeklyMoodsResponseData } from "@/shared/types";

type WeeklyChartData = { day: string; score: number; fullDate?: string }[];

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
  const sortedMoods = [...moodsData].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return sortedMoods.map((mood) => {
    const date = new Date(mood.date);
    const dayOfWeek = date.getDay();

    return {
      day: mapDayToString(dayOfWeek),
      score: mood.score,
    };
  });
};
