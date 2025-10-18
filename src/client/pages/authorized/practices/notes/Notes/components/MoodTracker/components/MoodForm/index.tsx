"use client";

import { Emojis, MoodTrackerValue } from "./components";
import styles from "./styles.module.scss";
import { FormErrorLabel, FormikForm, PrimaryButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate, useSaveMoodMutation } from "@/client/redux";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";
import { type FC, useState } from "react";

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
  const [saveMood, { isLoading }] = useSaveMoodMutation();
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const [emojiIds, setEmojiIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitHandler = (values: InitialValues) => {
    if (emojiIds.length) {
      const isCurrentDate = compareDates(notesCalendarDate, "current", {
        fullYear: true,
        month: true,
        date: true,
      });

      saveMood({
        ...values,
        emojiIds: emojiIds,
        date: isCurrentDate ? null : mapDateToApiDateFormat(notesCalendarDate),
      });

      onSubmitAction();
    } else {
      setErrorMessage("Необходимо выбрать хотя бы одну эмоцию");
    }
  };

  const selectEmojiHandler = (emojiIds: number[]) => {
    setEmojiIds(emojiIds);
    setErrorMessage(null);
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
      <Emojis onUpdate={selectEmojiHandler} />
      {errorMessage && (
        <div style={{ marginTop: "10px" }}>
          <FormErrorLabel>{errorMessage}</FormErrorLabel>
        </div>
      )}
      <PrimaryButton
        type="submit"
        className={styles.button}
        disabled={isLoading}
      >
        Сохранить
      </PrimaryButton>
    </FormikForm>
  );
};
