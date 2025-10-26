import type {
  GetExerciseApiResponseData,
  GetExerciseResponseData,
  GetExerciseStructureApiResponseData,
  GetExerciseStructureResponseData,
} from "@/shared/types";

export type GetExerciseResultApiResponseData = Pick<
  GetExerciseApiResponseData,
  "id" | "title" | "picture_link" | "description"
> & {
  exercise_id: string;
  date: string;
  sections: (Pick<
    GetExerciseStructureApiResponseData["pages"][number]["sections"][number],
    "title" | "view" | "type"
  > & {
    value: string | string[];
  })[];
};

export type GetExerciseResultResponseData = Pick<
  GetExerciseResponseData,
  "id" | "title" | "image" | "description"
> & {
  exerciseId: string;
  date: string;
  sections: (Pick<
    GetExerciseStructureResponseData["pages"][number]["sections"][number],
    "label" | "view" | "type"
  > & {
    value: string | string[];
  })[];
};
