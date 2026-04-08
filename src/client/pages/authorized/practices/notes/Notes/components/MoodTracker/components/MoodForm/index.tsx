"use client";

import { Button } from "@odeyalo/uikit";
import { type FC, useEffect, useState } from "react";
import { Emojis, MoodTrackerValue } from "./components";
import styles from "./styles.module.scss";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate, useSaveMoodMutation } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { compareDates, mapDateToApiDateFormat } from "@/shared/utils";

interface Props {
  onSubmitAction: () => void;
}

interface InitialValues {
  score: number;
}

export const MoodForm: FC<Props> = ({ onSubmitAction }) => {
  const [sessionStorageTracker, setSessionStorageTracker] = useState<
    string | null
  >(null);
  const [saveMood, { isLoading, isSuccess }] = useSaveMoodMutation();
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const [emojiIds, setEmojiIds] = useState<number[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { logEvent } = useAnalytics();

  useEffect(() => {
    const sessionStorageValue = sessionStorage.getItem("tracker");
    setSessionStorageTracker(sessionStorageValue);
  }, [setSessionStorageTracker, emojiIds]);

  useEffect(() => {
    if (isSuccess) {
      logEvent("mood-added");
    }
  }, [isSuccess, logEvent]);

  const tracker = sessionStorageTracker
    ? (JSON.parse(sessionStorageTracker) as {
        mood: number;
        emojis: number[];
      })
    : { mood: 50, emojis: [] };

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
    sessionStorage.setItem(
      "tracker",
      JSON.stringify({
        ...tracker,
        emojis: emojiIds,
      }),
    );
  };

  return (
    <FormikForm<InitialValues>
      initialValues={{ score: tracker.mood }}
      enableReinitialize
      onSubmit={submitHandler}
      className={styles.form}
    >
      <MoodTrackerValue />
      <FormikForm.RangeInput
        name="score"
        onUpdate={(value) => {
          sessionStorage.setItem(
            "tracker",
            JSON.stringify({
              ...tracker,
              mood: value,
            }),
          );
        }}
      />
      <Emojis
        onUpdate={selectEmojiHandler}
        defaultEmojis={tracker.emojis}
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
