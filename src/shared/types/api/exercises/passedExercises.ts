export interface GetUserPassedExercisesApiResponseData {
  exercises: {
    id: string;
    title: string;
    picture_link: string;
    date: string | null;
  }[];
}

export interface PassedExerciseResultData {
  id: string;
  exerciseId: string;
  exerciseTitle: string;
  preview: string;
  date: string;
}

export interface GetUserPassedExercisesResponseData {
  results: PassedExerciseResultData[];
}
