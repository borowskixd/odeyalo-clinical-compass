"use client";

import { ExerciseStructure, Grid } from "../../../../components";
import { AddableInputGroup, TextArea } from "odeyalo-uikit";
import { type GetExerciseResultResponseData } from "@/shared/types";
import { type FC } from "react";

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
          value: section.value,
        };

        if (section.type === "input") {
          return (
            <ExerciseStructure
              key={key}
              {...commonProps}
              component={TextArea}
              rows={4}
              readOnly
              disabled
            />
          );
        } else if (section.type === "addable_list") {
          return (
            <ExerciseStructure
              key={key}
              {...commonProps}
              component={AddableInputGroup}
              readOnly
              disabled
            />
          );
        }
      })}
    </Grid>
  );
};
