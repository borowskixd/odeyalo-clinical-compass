"use client";

import { ExerciseStructure, Grid } from "../../../../components";
import { AddableInputGroup, TextArea } from "odeyalo-uikit";
import { type FC } from "react";

type ExerciseResultData = {
  id: string;
  exercise_id: string;
  title: string;
  link_to_image: string;
  description: string;
  date: string;
  sections: {
    title: string;
    view: "primary" | "default";
    type: "input" | "addable_list";
    value: string | string[];
  }[];
};

interface Props {
  exerciseStructure: ExerciseResultData;
}

export const FormGenerator: FC<Props> = ({ exerciseStructure }) => {
  return (
    <Grid>
      {exerciseStructure.sections.map((section, index) => {
        const key = `${section.title}-${index}`;
        const commonProps = {
          labelText: section.title,
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
