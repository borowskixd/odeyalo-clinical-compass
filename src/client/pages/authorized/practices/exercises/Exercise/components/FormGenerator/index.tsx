import { AddableInputGroup, TextArea } from "@odeyalo/uikit";
import { type ChangeEventHandler, type FC, type ReactNode } from "react";
import { ExerciseStructure, Grid } from "../../../../components";
import { toGridTemplateAreas } from "../../../../components/Grid/utils";
import { type FormValuesType, type ValueType } from "../../types";
import { getPulledTargetSectionId, isPulledFieldValue } from "../../utils";
import {
  PulledFieldsSelect,
  RangeInputWrapper,
  SelectablePills,
} from "./components";
import { type GetExerciseStructureResponseData } from "@/shared/types";

interface Props {
  exerciseStructure: GetExerciseStructureResponseData;
  pageNumber: number;
  values: FormValuesType | null;
  changeHandler: (name: string, value: ValueType) => void;
}

export const FormGenerator: FC<Props> = ({
  exerciseStructure,
  pageNumber,
  values,
  changeHandler: handler,
}) => {
  const pulledTargetSectionId = getPulledTargetSectionId(exerciseStructure);

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

          if (section.id === pulledTargetSectionId) {
            const value = values?.[section.id] ?? null;

            component = (
              <ExerciseStructure
                {...commonProps}
                key={section.id}
                component={PulledFieldsSelect}
                options={exerciseStructure.pulledFields}
                value={isPulledFieldValue(value) ? value : null}
                onUpdate={(value) => handler(commonProps.name, value)}
              />
            );
          } else if (section.type === "input") {
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
          } else if (section.type === "choice") {
            const value = values?.[section.id];

            component = (
              <ExerciseStructure
                {...commonProps}
                key={section.id}
                component={SelectablePills}
                options={section.variants.map((variant) => ({
                  value: variant.title,
                  title: variant.title,
                }))}
                value={typeof value === "string" ? value : undefined}
                onUpdate={(value) => handler(commonProps.name, value)}
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
