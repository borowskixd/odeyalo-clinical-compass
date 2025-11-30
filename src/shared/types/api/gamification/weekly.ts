export interface GetWeeklyGamificationScoreResponse {
  scores: {
    date: string;
    score: number;
  }[];
}
