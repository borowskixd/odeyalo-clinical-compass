"use client";

import { Button } from "@odeyalo/uikit";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { NoteDate, SubmitButton } from "./components";
import styles from "./styles.module.scss";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useCreateNoteMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { mapDateToApiDateFormat } from "@/shared/utils";

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

  const trackerId = searchParams.get("trackerId");

  useEffect(() => {
    if (isSuccess) {
      router.push(pages.advices.path);
      logEvent("note-added");
    }
  }, [isSuccess, router, logEvent]);

  const dateParam = searchParams.get("date");

  let date: Date | null = null;

  if (dateParam && !isNaN(new Date(dateParam).valueOf())) {
    date = new Date(dateParam);
  }

  const onSubmitHandler = (values: InitialValues) => {
    const dateValue = date ? mapDateToApiDateFormat(date) : null;

    createNote({
      note: values.note,
      date: dateValue,
      trackerId: trackerId ?? "",
    });
  };

  const onSkipHandler = () => {
    router.push(pages.advices.path);
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

        <Button
          type="button"
          width="max"
          view="secondary"
          className={styles.skipButton}
          disabled={isLoading || isSuccess}
          onClick={onSkipHandler}
        >
          Пропустить
        </Button>
      </FormikForm>
    </>
  );
};
