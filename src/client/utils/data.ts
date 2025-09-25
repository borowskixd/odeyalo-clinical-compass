export const mapMoodTrackerScoreToMoodStatus = (score: number) => {
  if (score <= 20) return "Ужасно";
  else if (score <= 40) return "Плохо";
  else if (score <= 60) return "Нормально";
  else if (score <= 80) return "Хорошо";
  return "Превосходно";
};
