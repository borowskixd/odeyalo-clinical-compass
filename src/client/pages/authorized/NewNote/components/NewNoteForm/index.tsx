"use client";

import { SubmitButton } from "./components";
import styles from "./styles.module.scss";
import { FormikForm } from "@/client/components";
import { type FC } from "react";

interface InitialValues {
  note: string;
}

const initialValues: InitialValues = {
  note: "",
};

export const NewNoteForm: FC = () => {
  const onSubmitHandler = (values: InitialValues) => {
    console.log(values);
  };

  return (
    <FormikForm<InitialValues>
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      className={styles.form}
    >
      <FormikForm.Textarea
        name="note"
        placeholder="Напишите сюда что-нибудь..."
        className={styles.noteInput}
      />
      <SubmitButton />
    </FormikForm>
  );
};
