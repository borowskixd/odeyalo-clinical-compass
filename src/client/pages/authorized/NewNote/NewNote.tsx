"use client";

import styles from "./styles.module.scss";
import * as Yup from "yup";
import {
  Container,
  ContentWrapper,
  FormikForm,
  PageTitle,
  PrimaryButton,
} from "@/client/components";
import { type FC } from "react";

interface InitialValues {
  note: string;
}

const initialValues: InitialValues = {
  note: "",
};

const validationSchema: Yup.Schema<InitialValues> = Yup.object().shape({
  note: Yup.string().required("Данное поле обязательно"),
});

export const NewNotePage: FC = () => {
  const onSubmitHandler = (values: InitialValues) => {
    console.log(values);
  };

  return (
    <Container>
      <ContentWrapper>
        <PageTitle>26 ноября</PageTitle>
        <h3 className={styles.date}>Вторник, 9:30</h3>
        <FormikForm<InitialValues>
          initialValues={initialValues}
          onSubmit={onSubmitHandler}
          validationSchema={validationSchema}
          className={styles.form}
        >
          <FormikForm.Textarea
            name="note"
            placeholder="Напишите сюда что-нибудь..."
            className={styles.noteInput}
          />
          <PrimaryButton
            type="submit"
            className={styles.button}
          >
            Сохранить
          </PrimaryButton>
        </FormikForm>
      </ContentWrapper>
    </Container>
  );
};
