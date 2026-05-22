"use client";

import { Button } from "@odeyalo/uikit";
import { type FC, useEffect, useState } from "react";
import { Emojis, MoodTrackerValue } from "./components";
import styles from "./styles.module.scss";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import {
  notesActions,
  selectMoodTracker,
  selectNotesCalendarDate,
  useSaveMoodMutation,
} from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";

interface Props {
  onSubmitAction: () => void;
}

interface InitialValues {
  score: number;
}

export const MoodForm: FC<Props> = ({ onSubmitAction }) => {
  const dispatch = useAppDispatch();
  const moodTracker = useAppSelector(selectMoodTracker);
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const [saveMood, { isLoading, isSuccess }] = useSaveMoodMutation();
  const [emojiIds, setEmojiIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { logEvent } = useAnalytics();

  console.log(moodTracker);

  useEffect(() => {
    if (isSuccess) {
      logEvent("mood-added");
    }
  }, [isSuccess, logEvent]);

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
    dispatch(notesActions.setMoodTrackerEmojis(emojiIds));
  };

  const handleUpdateMood = (value: number) => {
    dispatch(notesActions.setMoodTrackerValue(value));
  };

  return (
    <FormikForm<InitialValues>
      initialValues={{ score: moodTracker.mood }}
      enableReinitialize
      onSubmit={submitHandler}
      className={styles.form}
    >
      <MoodTrackerValue />
      <FormikForm.RangeInput
        name="score"
        onUpdate={handleUpdateMood}
      />
      <Emojis
        onUpdate={selectEmojiHandler}
        defaultEmojis={moodTracker.emojis}
      />
      {errorMessage && (
        <div style={{ marginTop: "10px" }}>
          <FormErrorLabel>{errorMessage}</FormErrorLabel>
        </div>
      )}
      <Button
        type="submit"
        className={styles.button}
        disabled={isLoading}
        view="primary"
        width="max"
      >
        Сохранить
      </Button>
    </FormikForm>
  );
};
