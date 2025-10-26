export type GetExerciseResultsApiResponseData = {
  results: {
    id: string;
    exercise_id: string;
    preview: string;
    date: string;
  }[];
};

export type GetExerciseResultsResponseData = {
  results: {
    id: string;
    exerciseId: string;
    title: string;
    date: string;
  }[];
};
