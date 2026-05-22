import { type FormValuesType, type ValueType } from "./types";
import { type GetExerciseStructureResponseData } from "@/shared/types";

export const generateInitialValue = (
  exercise: GetExerciseStructureResponseData,
): FormValuesType => {
  const initialValue: FormValuesType = {};

  exercise.pages.forEach((page) => {
    page.sections.forEach((section) => {
      let fieldInitialValue: ValueType = "";

      if (section.type === "input") {
        fieldInitialValue = "";
      } else if (section.type === "addable_list") {
        fieldInitialValue = [];
      } else if (section.type === "slider") {
        fieldInitialValue = 3;
      }

      initialValue[section.id] = fieldInitialValue;
    });
  });

  return initialValue;
};

export const validateExerciseData = (
  values: FormValuesType | null,
): string | null => {
  const errorMessage: string = "Заполните все поля";

  if (values === null) {
    return errorMessage;
  } else {
    for (const key in values) {
      const value = values[key];

      if (
        (typeof value === "string" || Array.isArray(value)) &&
        value.length === 0
      ) {
        return errorMessage;
      }
    }
  }

  return null;
};
