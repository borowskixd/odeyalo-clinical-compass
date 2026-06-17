import { type FC } from "react";
import { type SelectablePillOption, SelectablePills } from "../SelectablePills";
import { type PulledFieldValue } from "@/client/pages/authorized/practices/exercises/Exercise/types";
import { type GetExerciseStructureResponseData } from "@/shared/types";

type PulledFieldGroup =
  GetExerciseStructureResponseData["pulledFields"][number];

interface Props {
  name?: string;
  options: PulledFieldGroup[];
  placeholder?: string;
  value: PulledFieldValue | null;
  onUpdate: (value: PulledFieldValue) => void;
}

const formatPulledText = (
  text: PulledFieldGroup["fields"][number]["text"],
): string => {
  if (Array.isArray(text)) return text.join(", ");
  if (text === null) return "";

  return String(text);
};

const getOptionValue = (option: PulledFieldGroup) => {
  return `${option.sourceCompletedExerciseId}:${option.sourceGroupKey}`;
};

const getOptionTitle = (option: PulledFieldGroup) => {
  return option.fields.map((field) => formatPulledText(field.text)).join(" · ");
};

export const PulledFieldsSelect: FC<Props> = ({ options, value, onUpdate }) => {
  const mappedOptions: SelectablePillOption[] = options.map((option) => ({
    value: getOptionValue(option),
    title: getOptionTitle(option),
    description:
      option.fields.length > 1
        ? option.fields.map((field) => field.title).join(" · ")
        : undefined,
  }));

  return (
    <SelectablePills
      emptyMessage="Сначала выполните предыдущее упражнение"
      options={mappedOptions}
      value={
        value
          ? `${value.pulledCompletedExerciseId}:${value.pulledGroupKey}`
          : undefined
      }
      onUpdate={(selectedValue) => {
        const selectedOption = options.find(
          (option) => getOptionValue(option) === selectedValue,
        );

        if (!selectedOption) return;

        onUpdate({
          value: getOptionTitle(selectedOption),
          pulledCompletedExerciseId: selectedOption.sourceCompletedExerciseId,
          pulledGroupKey: selectedOption.sourceGroupKey,
        });
      }}
    />
  );
};
