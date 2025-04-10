"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import problemDefinition from "@/client/assets/webp/pictures/problemDefinition.webp";
import {
  FormErrorLabel,
  FormikForm,
  PageTitle,
  PrimaryButton,
} from "@/client/components";
import { ImageContentPageLayout } from "@/client/components/layouts";
import { ExerciseTextarea } from "@/client/pages/authorized/exercises/components";
import { useSendProblemDefinitionMutation } from "@/client/redux/features/problemDefinitions";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type SendProblemDefinitionRequestData } from "@/shared/types";
import { type FC, useEffect } from "react";

const initialValues: SendProblemDefinitionRequestData = {
  sphere: "",
  emotion: "",
  target: "",
};

export const ProblemDefinitionFormPage: FC = () => {
  const router = useRouter();
  const [createProblemDefinition, { isLoading, isSuccess, isError, error }] =
    useSendProblemDefinitionMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push(pages.problemDefinition.path);
    }
  }, [isSuccess, router]);

  const onSubmitHandler = (values: SendProblemDefinitionRequestData) => {
    createProblemDefinition(values);
  };

  const disabled = isLoading || isSuccess;

  return (
    <ImageContentPageLayout imageSrc={problemDefinition.src}>
      <PageTitle className={styles.title}>
        Определение групп (категорий) проблем
      </PageTitle>
      <FormikForm
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <ExerciseTextarea
          name="sphere"
          placeholder={"Укажите сферу"}
          labelText={"В какой сфере вы испытываете трудности?"}
          hintText={"Например, работа или личная жизнь"}
          disabled={disabled}
        />
        <ExerciseTextarea
          name="emotion"
          placeholder={"Укажите эмоцию"}
          labelText={"Что вы чувствуете по этому поводу?"}
          hintText={"Одно слово, наиболее ярко, описывающее ваши ощущения"}
          disabled={disabled}
        />
        <ExerciseTextarea
          name="target"
          placeholder={"Укажите цель"}
          labelText={"Чего вы хотите добиться, когда решите проблему?"}
          disabled={disabled}
        />
        {isError && !!error && (
          <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
        )}
        <PrimaryButton
          type="submit"
          className={styles.button}
          disabled={disabled}
        >
          Сохранить
        </PrimaryButton>
      </FormikForm>
    </ImageContentPageLayout>
  );
};
