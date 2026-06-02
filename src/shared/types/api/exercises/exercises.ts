import {
  type GetExerciseApiResponseData,
  type GetExerciseResponseData,
} from "@/shared/types";

export type GetExercisesApiResponseData = {
  regular_exercises: Pick<
    GetExerciseApiResponseData,
    "id" | "title" | "picture_link" | "open"
  >[];
};

export type GetExercisesResponseData = {
  exercises: Pick<
    GetExerciseResponseData,
    "id" | "title" | "image" | "closed"
  >[];
};

export type CompleteExerciseApiRequestData = {
  exercise_structure_id: string;
  filled_fields: {
    field_id: string;
    text: string | string[];
    pulled_completed_exercise_id: null | string;
    pulled_group_key: null | string;
  }[];
};

export type CompleteExerciseRequestData = {
  exerciseId: string;
  values: {
    id: string;
    value: string | string[];
  }[];
};

export type CompleteExerciseApiResponseData = {
  id: string;
  score: number;
  picture_link: string;
  success_message: string;
};

export type CompleteExerciseResponseData = {
  id: string;
  score: number;
  image: string;
  message: string;
};
