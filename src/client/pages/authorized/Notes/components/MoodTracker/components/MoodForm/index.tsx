"use client";

import { MoodTrackerValue } from "./components";
import styles from "./styles.module.scss";
import { FormikForm, PrimaryButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate, useSaveMoodMutation } from "@/client/redux";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";
import { type FC } from "react";

interface Props {
  onSubmitAction: () => void;
}

interface InitialValues {
  score: number;
}

const initialValues: InitialValues = {
  score: 50,
};

export const MoodForm: FC<Props> = ({ onSubmitAction }) => {
  const [saveMood] = useSaveMoodMutation();
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);

  const submitHandler = (values: InitialValues) => {
    if (
      compareDates(notesCalendarDate, "current", {
        fullYear: true,
        month: true,
        date: true,
      })
    ) {
      saveMood(values);
    } else {
      saveMood({
        ...values,
        date: mapDateToApiDateFormat(notesCalendarDate),
      });
    }

    onSubmitAction();
  };

  return (
    <FormikForm<InitialValues>
      initialValues={initialValues}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <MoodTrackerValue />
      <FormikForm.RangeInput
        name="score"
        min="0"
        max="100"
      />
      <PrimaryButton
        type="submit"
        className={styles.button}
      >
        Сохранить
      </PrimaryButton>
    </FormikForm>
  );
};
