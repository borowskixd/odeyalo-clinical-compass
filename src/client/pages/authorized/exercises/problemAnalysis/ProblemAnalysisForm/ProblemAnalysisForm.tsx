"use client";

import styles from "./styles.module.scss";
import problemAnalysisImage from "@/client/assets/webp/pictures/problemAnalysisImage.webp";
import { FormikForm, PageTitle, PrimaryButton } from "@/client/components";
import { ImageContentPageLayout } from "@/client/components/layouts";
import {
  ExerciseTextarea,
  ExerciseTextareaResult,
} from "@/client/pages/authorized/exercises/components";
import { type FC } from "react";

interface InitialValues {
  development: string;
}

const initialValues: InitialValues = {
  development: "",
};

export const ProblemAnalysisFormPage: FC = () => {
  const onSubmitHandler = (values: InitialValues) => {
    console.log(values);
  };

  return (
    <ImageContentPageLayout imageSrc={problemAnalysisImage.src}>
      <PageTitle className={styles.title}>Анализ проблемы</PageTitle>
      <FormikForm
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <ExerciseTextareaResult
          value={"Я боюсь публичных выступлений"}
          labelText={"Проблема"}
        />
        <ExerciseTextareaResult
          value={"Хочу научиться спокойно выступать перед людьми"}
          labelText={"Цель"}
        />
        <ExerciseTextarea
          name="development"
          placeholder={""}
          labelText={"Проработка"}
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
