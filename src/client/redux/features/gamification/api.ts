import { api } from "../../api";
import {
  type GetCurrentGamificationScoreResponse,
  type GetWeeklyGamificationScoreResponse,
} from "@/shared/types";

const gamificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentGamificationScore: builder.query<
      GetCurrentGamificationScoreResponse,
      void
    >({
      query: () => "/gamification/current",
      providesTags: [
        "Auth",
        "TestResults",
        "Moods",
        "ExerciseResults",
        "Notes",
        "Articles",
      ],
    }),

    getWeeklyGamificationScore: builder.query<
      GetWeeklyGamificationScoreResponse,
      void
    >({
      query: () => "/gamification/weekly",
      providesTags: [
        "Auth",
        "TestResults",
        "Moods",
        "ExerciseResults",
        "Notes",
        "Articles",
      ],
    }),
  }),
});

export const {
  useGetCurrentGamificationScoreQuery,
  useGetWeeklyGamificationScoreQuery,
} = gamificationApi;
