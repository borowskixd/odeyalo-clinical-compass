"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { NoteDate, SubmitButton } from "./components";
import styles from "./styles.module.scss";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useCreateNoteMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";

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
  const { logEvent } = useAnalytics();

  useEffect(() => {
    if (isSuccess) {
      router.push(pages.notes.path);

      logEvent("note-added");
    }
  }, [isSuccess, router, logEvent]);

  const dateParam = searchParams.get("date");

  let date: Date | null = null;

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
    const dateValue = date ? mapDateToApiDateFormat(date) : null;

    createNote({
      ...values,
      date: dateValue,
    });
  };

  return (
    <>
      <NoteDate date={date ?? new Date()} />
      <FormikForm<InitialValues>
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        className={styles.form}
      >
        <FormikForm.TextArea
          name="note"
          placeholder="Напишите сюда что-нибудь..."
          className={styles.noteInput}
          disabled={isLoading || isSuccess}
          minRows={10}
        />
        {isError && !!error && (
          <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
        )}
        <SubmitButton disabled={isLoading || isSuccess} />
      </FormikForm>
    </>
  );
};
