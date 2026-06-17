import {
  type FormValuesType,
  type PulledFieldValue,
  type ValueType,
} from "./types";
import { type GetExerciseStructureResponseData } from "@/shared/types";

export const isPulledFieldValue = (
  value: ValueType,
): value is PulledFieldValue => {
  return (
    typeof value === "object" &&
    value !== null &&
    "value" in value &&
    "pulledCompletedExerciseId" in value &&
    "pulledGroupKey" in value
  );
};

export const getPulledTargetSectionId = (
  exercise: GetExerciseStructureResponseData,
): null | string => {
  if (exercise.pulledFields.length === 0) return null;

  return exercise.pages[0]?.sections[0]?.id ?? null;
};

export const getPulledFieldReference = (values: FormValuesType) => {
  return Object.values(values).find(isPulledFieldValue) ?? null;
};

export const mapFormValueToText = (value: ValueType): string | string[] => {
  if (isPulledFieldValue(value)) return value.value;
  if (Array.isArray(value)) return value;

  return value === null ? "" : String(value);
};

export const generateInitialValue = (
  exercise: GetExerciseStructureResponseData,
): FormValuesType => {
  const initialValue: FormValuesType = {};
  const pulledTargetSectionId = getPulledTargetSectionId(exercise);

  exercise.pages.forEach((page) => {
    page.sections.forEach((section) => {
      let fieldInitialValue: ValueType = "";

      if (section.id === pulledTargetSectionId) {
        fieldInitialValue = null;
      } else if (section.type === "choice" || section.type === "input") {
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
        value === null ||
        (isPulledFieldValue(value) && value.value.length === 0) ||
        ((typeof value === "string" || Array.isArray(value)) &&
          value.length === 0)
      ) {
        return errorMessage;
      }
    }
  }

  return null;
};
