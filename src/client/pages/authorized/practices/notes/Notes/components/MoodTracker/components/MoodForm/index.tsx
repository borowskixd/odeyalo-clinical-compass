"use client";

import { Button } from "@odeyalo/uikit";
import { useRouter } from "next/navigation";
import { type FC } from "react";
import { Emojis } from "./components";
import styles from "./styles.module.scss";
import { FormikForm } from "@/client/components";
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

  const submitHandler = (values: InitialValues) => {
    dispatch(notesActions.setMoodDraftScore(values.score));
    onSubmitAction?.();
    router.push(pages.tags.path);
  };

  const selectEmotionsHandler = (emotions: string[]) => {
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
      <Button
        type="submit"
        className={styles.button}
        view="secondary"
        width="max"
      >
        Далее
      </Button>
    </FormikForm>
  );
};
