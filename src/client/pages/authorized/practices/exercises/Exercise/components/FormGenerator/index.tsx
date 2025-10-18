import { ExerciseStructure, Grid } from "../../../../components";
import { type ExerciseStructureData, type ValueType } from "../../types";
import { AddableInputGroup, TextArea } from "odeyalo-uikit";
import { type ChangeEventHandler, type FC, type ReactNode } from "react";

interface Props {
  exerciseStructure: ExerciseStructureData;
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
        key={page.page_number}
        hidden={pageNumber !== page.page_number}
      >
        {page.sections.map((section) => {
          let component: ReactNode = null;

          const commonProps = {
            name: section.id,
            labelText: section.title,
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
          }

          return component;
        })}
      </Grid>
    );
  });
};
