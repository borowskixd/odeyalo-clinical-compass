"use client";

import { NoteDate, SubmitButton } from "./components";
import styles from "./styles.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useCreateNoteMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";
import { type FC, useEffect } from "react";

interface InitialValues {
  note: string;
}

const initialValues: InitialValues = {
  note: "",
};

export const NewNoteForm: FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [createNote, { isLoading, isSuccess, isError, error }] =
    useCreateNoteMutation();

  useEffect(() => {
    if (isSuccess) {
      router.push(pages.notes.path);
    }
  }, [isSuccess, router]);

  const dateParam = searchParams.get("date");

  let date: Date = new Date();

  if (
    dateParam &&
    !isNaN(new Date(dateParam).valueOf()) &&
    new Date() > new Date(dateParam) &&
    !compareDates(new Date(dateParam), "current", {
      fullYear: true,
      month: true,
      date: true,
    })
  ) {
    date = new Date(dateParam);
  }

  const onSubmitHandler = (values: InitialValues) => {
    if (
      compareDates(date, "current", { fullYear: true, month: true, date: true })
    ) {
      createNote(values);
    } else {
      createNote({
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
          disabled={isLoading || isSuccess}
        />
        {isError && !!error && (
          <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
        )}
        <SubmitButton disabled={isLoading || isSuccess} />
      </FormikForm>
    </>
  );
};
