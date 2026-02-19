import { AddableInputGroup, TextArea } from "@odeyalo/uikit";
import { type ChangeEventHandler, type FC, type ReactNode } from "react";
import { ExerciseStructure, Grid } from "../../../../components";
import { toGridTemplateAreas } from "../../../../components/Grid/utils";
import { type ValueType } from "../../types";
import { RangeInputWrapper } from "@/client/pages/authorized/practices/exercises/Exercise/components/FormGenerator/components";
import { type GetExerciseStructureResponseData } from "@/shared/types";

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
    const gridStyle = {
      ["--grid-template-areas" as any]: toGridTemplateAreas(
        page.sections.length,
      ),
    };

    return (
      <Grid
        key={page.number}
        style={{ ...gridStyle }}
        hidden={pageNumber !== page.number}
      >
        {page.sections.map((section, sectionIndex) => {
          let component: ReactNode = null;

          const commonProps = {
            name: section.id,
            labelText: section.label,
            placeholder: section.placeholder,
            hintText: section.prompt ? section.prompt : undefined,
            sectionIndex,
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
              onUpdate: changeHandler,
            };

            component = (
              <ExerciseStructure
                {...commonProps}
                key={section.id}
                component={RangeInputWrapper}
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
