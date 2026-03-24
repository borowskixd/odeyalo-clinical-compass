import type {
  GetTrainingExerciseApiResponseData,
  GetTrainingExerciseResponseData,
} from "./exercise";

export type GetTrainingExercisesApiResponseData = {
  exercises: Pick<
    GetTrainingExerciseApiResponseData,
    "id" | "title" | "picture_link" | "is_completed"
  >[];
};

export type GetTrainingExercisesResponseData = {
  exercises: Pick<
    GetTrainingExerciseResponseData,
    "id" | "title" | "image" | "completed"
  >[];
};
