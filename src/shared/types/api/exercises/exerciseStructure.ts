import type {
  GetExerciseApiResponseData,
  GetExerciseResponseData,
} from "@/shared/types";

export type ExerciseSectionView = "default" | "primary";
export type ExerciseSectionType = "addable_list" | "input" | "slider";

export type GetExerciseStructureApiResponseData = GetExerciseApiResponseData & {
  pages: {
    page_number: number;
    sections: {
      id: string;
      title: string;
      view: ExerciseSectionView;
      type: ExerciseSectionType;
      placeholder: string;
      prompt: string;
    }[];
  }[];
};

export type GetExerciseStructureResponseData = GetExerciseResponseData & {
  pages: {
    number: number;
    sections: {
      id: string;
      label: string;
      view: ExerciseSectionView;
      type: ExerciseSectionType;
      placeholder: string;
      prompt: string;
    }[];
  }[];
};
