"use client";

import { ExerciseTextarea } from "../components";
import styles from "./styles.module.scss";
import problemDefinition from "@/client/assets/webp/pictures/problemDefinition.webp";
import { FormikForm, PrimaryButton } from "@/client/components";
import { ImageContentPageLayout } from "@/client/components/layouts";
import { type FC } from "react";

interface InitialValues {
  area: string;
  emotion: string;
  target: string;
}

const initialValues: InitialValues = {
  area: "",
  emotion: "",
  target: "",
};

export const ProblemDefinitionFormPage: FC = () => {
  const onSubmitHandler = (values: InitialValues) => {
    console.log(values);
  };

  return (
    <ImageContentPageLayout imageSrc={problemDefinition.src}>
      <FormikForm
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <ExerciseTextarea
          name="area"
          placeholder={"Укажите сферу"}
          labelText={"В какой сфере вы испытываете трудности?"}
          hintText={"Например, работа или личная жизнь"}
        />
        <ExerciseTextarea
          name="emotion"
          placeholder={"Укажите эмоцию"}
          labelText={"Что вы чувствуете по этому поводу?"}
          hintText={"Одно слово, наиболее ярко, описывающее ваши ощущения"}
        />
        <ExerciseTextarea
          name="target"
          placeholder={"Укажите цель"}
          labelText={"Чего вы хотите добиться, когда решите проблему?"}
        />
        <PrimaryButton
          type="submit"
          className={styles.button}
        >
          Сохранить
        </PrimaryButton>
      </FormikForm>
    </ImageContentPageLayout>
  );
};
