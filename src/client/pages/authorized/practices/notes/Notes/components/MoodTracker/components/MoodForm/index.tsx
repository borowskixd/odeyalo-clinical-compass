"use client";

import { Button } from "@odeyalo/uikit";
import { useRouter } from "next/navigation";
import { type FC, useState } from "react";
import { Emojis } from "./components";
import styles from "./styles.module.scss";
import { FormErrorLabel, FormikForm } from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import {
  notesActions,
  selectMoodDraft,
  selectMoodTracker,
} from "@/client/redux";
import { pages } from "@/shared/data";

interface Props {
  onSubmitAction?: () => void;
}

interface InitialValues {
  score: number;
}

export const MoodForm: FC<Props> = ({ onSubmitAction }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const moodTracker = useAppSelector(selectMoodTracker);
  const moodDraft = useAppSelector(selectMoodDraft);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitHandler = (values: InitialValues) => {
    if (moodDraft.emotions.length === 0) {
      setErrorMessage("Выберите хотя бы одну эмоцию");
      return;
    }

    setErrorMessage(null);
    dispatch(notesActions.setMoodDraftScore(values.score));
    onSubmitAction?.();
    router.push(pages.tags.path);
  };

  const selectEmotionsHandler = (emotions: string[]) => {
    setErrorMessage(null);
    dispatch(notesActions.setMoodDraftEmotions(emotions));
  };

  const handleUpdateMood = (value: number) => {
    dispatch(notesActions.setMoodTrackerValue(value));
  };

  const handleOtherClick = () => {
    dispatch(notesActions.setMoodDraftScore(moodTracker.mood));
    router.push(pages.emotions.path);
  };

  return (
    <FormikForm<InitialValues>
      initialValues={{ score: moodTracker.mood }}
      enableReinitialize
      onSubmit={submitHandler}
      className={styles.form}
    >
      <FormikForm.RangeInput
        name="score"
        onUpdate={handleUpdateMood}
      />
      <Emojis
        onUpdate={selectEmotionsHandler}
        onOtherClick={handleOtherClick}
        defaultEmotions={moodDraft.emotions}
      />
      {errorMessage && (
        <div style={{ marginTop: "10px" }}>
          <FormErrorLabel>{errorMessage}</FormErrorLabel>
        </div>
      )}
      <Button
        type="submit"
        className={styles.button}
        view="primary"
        width="max"
        disabled={moodDraft.emotions.length === 0}
      >
        Далее
      </Button>
    </FormikForm>
  );
};
