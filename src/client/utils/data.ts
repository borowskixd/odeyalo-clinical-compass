export const mapMoodTrackerScoreToMoodStatus = (score: number) => {
  if (score <= 0) return "Ужасно";
  else if (score <= 1) return "Плохо";
  else if (score <= 2) return "Нормально";
  else if (score <= 3) return "Хорошо";
  return "Превосходно";
};
