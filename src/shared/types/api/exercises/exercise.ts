export type GetExerciseApiResponseData = {
  id: string;
  title: string;
  picture_link: string;
  description: string;
  time_to_read: number;
  questions_count: number;
  open: boolean;
};

export type GetExerciseResponseData = {
  id: string;
  title: string;
  image: string;
  description: string;
  timeToRead: number;
  questionsCount: number;
  closed: boolean;
};
