"use client";

import { AddableInputGroup, TextArea } from "@odeyalo/uikit";
import { type FC } from "react";
import { ExerciseStructure, Grid } from "../../../../components";
import { type GetExerciseResultResponseData } from "@/shared/types";

type FormGeneratorProps = {
  exerciseStructure: GetExerciseResultResponseData;
};

export const FormGenerator: FC<FormGeneratorProps> = ({
  exerciseStructure,
}) => {
  return (
    <Grid>
      {exerciseStructure.sections.map((section, index) => {
        const key = `${section.label}-${index}`;

        const commonProps = {
          labelText: section.label,
          readOnly: true,
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
        }
      })}
    </Grid>
  );
};
