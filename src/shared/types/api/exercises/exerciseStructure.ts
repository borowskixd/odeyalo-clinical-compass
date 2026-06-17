import type {
  GetExerciseApiResponseData,
  GetExerciseResponseData,
} from "@/shared/types";

export type ExerciseSectionView = "default" | "primary";
export type ExerciseSectionType =
  | "addable_list"
  | "choice"
  | "input"
  | "slider"
  | "text";

export type ExercisePulledFieldText =
  | null
  | number
  | string
  | string[]
  | number[];

export type GetExerciseStructureApiResponseData = GetExerciseApiResponseData & {
  pulled_fields: {
    source_completed_exercise_id: string;
    source_exercise_id: string;
    source_group_key: string;
    fields: {
      source_filled_field_id: string;
      field_id: string;
      title: string;
      text: ExercisePulledFieldText;
      source_group_key: string;
    }[];
  }[];
  pages: {
    page_number: number;
    sections: {
      id: string;
      title: string;
      view: ExerciseSectionView;
      type: ExerciseSectionType;
      placeholder: string;
      prompt: string;
      variants: {
        id: string;
        title: string;
        field_id: string;
      }[];
    }[];
  }[];
};

export type GetExerciseStructureResponseData = GetExerciseResponseData & {
  pulledFields: {
    sourceCompletedExerciseId: string;
    sourceExerciseId: string;
    sourceGroupKey: string;
    fields: {
      sourceFilledFieldId: string;
      fieldId: string;
      title: string;
      text: ExercisePulledFieldText;
      sourceGroupKey: string;
    }[];
  }[];
  pages: {
    number: number;
    sections: {
      id: string;
      label: string;
      view: ExerciseSectionView;
      type: ExerciseSectionType;
      placeholder: string;
      prompt: string;
      variants: {
        id: string;
        title: string;
        fieldId: string;
      }[];
    }[];
  }[];
};
