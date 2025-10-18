import {
  type ExerciseStructureData,
  type FormValuesType,
  type ValueType,
} from "./types";

export const generateInitialValue = (
  exercise: ExerciseStructureData,
): FormValuesType => {
  const initialValue: FormValuesType = {};

  exercise.pages.forEach((page) => {
    page.sections.forEach((section) => {
      let fieldInitialValue: ValueType = "";

      if (section.type === "input") {
        fieldInitialValue = "";
      } else if (section.type === "addable_list") {
        fieldInitialValue = [];
      }

      initialValue[section.id] = fieldInitialValue;
    });
  });

  return initialValue;
};
