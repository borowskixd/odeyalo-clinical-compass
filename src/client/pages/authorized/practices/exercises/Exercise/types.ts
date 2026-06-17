export type PulledFieldValue = {
  value: string | string[];
  pulledCompletedExerciseId: string;
  pulledGroupKey: string;
};

export type ValueType = null | number | string | string[] | PulledFieldValue;

export type FormValuesType = Record<string, ValueType>;
