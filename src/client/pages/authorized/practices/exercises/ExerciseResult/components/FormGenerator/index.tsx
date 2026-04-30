"use client";

import { AddableInputGroup, TextArea } from "@odeyalo/uikit";
import { type FC } from "react";
import { ExerciseStructure, Grid } from "../../../../components";
import { toGridTemplateAreas } from "@/client/pages/authorized/practices/components/Grid/utils";
import { RangeInputWrapper } from "@/client/pages/authorized/practices/exercises/Exercise/components/FormGenerator/components";
import { type GetExerciseResultResponseData } from "@/shared/types";

type FormGeneratorProps = {
  exerciseStructure: GetExerciseResultResponseData;
};

export const FormGenerator: FC<FormGeneratorProps> = ({
  exerciseStructure,
}) => {
  const gridStyle = {
    ["--grid-template-areas" as any]: toGridTemplateAreas(
      exerciseStructure.sections.length,
    ),
  };

  return (
    <Grid style={gridStyle}>
      {exerciseStructure.sections.map((section, sectionIndex) => {
        const key = `${section.label}-${sectionIndex}`;

        const commonProps = {
          labelText: section.label,
          readOnly: true,
          sectionIndex,
        };

        if (section.type === "input") {
          return (
            <ExerciseStructure
              key={key}
              {...commonProps}
              value={section.value}
              component={TextArea}
              rows={4}
            />
          );
        } else if (section.type === "addable_list") {
          const values = section.value;

          const propsValueAsArray = {
            initialValues: values as string[],
          };
          const propsValueAsString = {
            value: values,
          };

          return (
            <ExerciseStructure
              key={key}
              {...commonProps}
              {...(Array.isArray(values)
                ? propsValueAsArray
                : propsValueAsString)}
              component={AddableInputGroup}
            />
          );
        } else if (section.type === "slider") {
          const parsedValue =
            typeof section.value === "string"
              ? Number(section.value)
              : Number.NaN;

          const rangeProps = {
            min: 1,
            max: 5,
            step: 1,
            defaultValue: 3,
            value: Number.isFinite(parsedValue) ? parsedValue : 3,
            labels: ["Ужасно", "Плохо", "Нормально", "Хорошо", "Потрясающе"],
          };

          return (
            <ExerciseStructure
              {...commonProps}
              key={key}
              component={RangeInputWrapper}
              {...rangeProps}
            />
          );
        }
      })}
    </Grid>
  );
};
