"use client";

import { NoteDate, SubmitButton } from "./components";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { FormikForm } from "@/client/components";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";
import { type FC } from "react";

interface InitialValues {
  note: string;
}

const initialValues: InitialValues = {
  note: "",
};

export const NewNoteForm: FC = () => {
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date");

  let date: Date = new Date();

  if (
    dateParam &&
    !isNaN(new Date(dateParam).valueOf()) &&
    new Date() > new Date(dateParam)
  ) {
    date = new Date(dateParam);
  }

  const onSubmitHandler = (values: InitialValues) => {
    if (
      compareDates(date, "current", { fullYear: true, month: true, date: true })
    ) {
      console.log(values);
    } else {
      console.log({
        ...values,
        date: mapDateToApiDateFormat(date),
      });
    }
  };

  return (
    <>
      <NoteDate date={date} />
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
    </>
  );
};
