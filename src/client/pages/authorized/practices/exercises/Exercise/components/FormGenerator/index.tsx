import { ExerciseStructure, Grid } from "../../../../components";
import { type ValueType } from "../../types";
import { type GetExerciseStructureResponseData } from "@/shared/types";
import { AddableInputGroup, RangeInput, TextArea } from "@odeyalo/uikit";
import { type ChangeEventHandler, type FC, type ReactNode } from "react";

interface Props {
  exerciseStructure: GetExerciseStructureResponseData;
  pageNumber: number;
  changeHandler: (name: string, value: ValueType) => void;
}

export const FormGenerator: FC<Props> = ({
  exerciseStructure,
  pageNumber,
  changeHandler: handler,
}) => {
  return exerciseStructure.pages.map((page) => {
    return (
      <Grid
        key={page.number}
        hidden={pageNumber !== page.number}
      >
        {page.sections.map((section) => {
          let component: ReactNode = null;

          const commonProps = {
            name: section.id,
            labelText: section.label,
            placeholder: section.placeholder,
            hintText: section.prompt ? section.prompt : undefined,
          };

          if (section.type === "input") {
            const changeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
              event,
            ) => {
              handler(commonProps.name, event.target.value);
            };

            component = (
              <ExerciseStructure
                {...commonProps}
                key={section.id}
                component={TextArea}
                rows={4}
                onChange={changeHandler}
              />
            );
          } else if (section.type === "addable_list") {
            const changeHandler = (values: string[]) => {
              handler(commonProps.name, values);
            };

            component = (
              <ExerciseStructure
                {...commonProps}
                key={section.id}
                component={AddableInputGroup}
                onUpdate={changeHandler}
              />
            );
          } else if (section.type === "slider") {
            const changeHandler = (value: number) => {
              handler(commonProps.name, value.toString());
            };

            const rangeProps = {
              min: 1,
              max: 5,
              step: 1,
              defaultValue: 3,
              labels: ["Ужасно", "Плохо", "Нормально", "Хорошо", "Потрясающе"],
              onUpdate: changeHandler, // Теперь это (value: number) => void
            };

            component = (
              <ExerciseStructure
                {...commonProps}
                key={section.id}
                component={RangeInput}
                {...rangeProps}
              />
            );
          }

          return component;
        })}
      </Grid>
    );
  });
};
