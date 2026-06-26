import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BFF_API_URL } from "@/shared/config/api";

export const api = createApi({
  reducerPath: "api",
  tagTypes: [
    "Auth",
    "Applications",
    "Clients",
    "TestResults",
    "Feedbacks",
    "Articles",
    "Moods",
    "Notes",
    "ExerciseResults",
    "Exercises",
    "TrainingExercise",
    "Users",
    "Tasks",
  ],
  baseQuery: fetchBaseQuery({ baseUrl: BFF_API_URL }),
  endpoints: () => ({}),
});
