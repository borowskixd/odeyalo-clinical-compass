"use client";

import styles from "./styles.module.scss";
import { useFormikContext } from "formik";
import { PrimaryButton } from "@/client/components";
import { type FC } from "react";

interface FormValues {
  situation: string;
  mood: string;
  moodLevel: number;
  thoughts: string;
  confirmThoughts: string;
  refuteThoughts: string;
  newMood: string;
  newThoughts: string;
  newMoodLevel: number;
  behavior: string;
}

interface Props {
  disabled: boolean;
}

export const SubmitButton: FC<Props> = ({ disabled }) => {
  const { values } = useFormikContext<FormValues>();

  const isButtonDisabled =
    values.situation === "" ||
    values.mood === "" ||
    values.thoughts === "" ||
    values.confirmThoughts === "" ||
    values.refuteThoughts === "" ||
    values.newMood === "" ||
    values.newThoughts === "" ||
    values.behavior === "" ||
    disabled;

  return (
    <PrimaryButton
      type="submit"
      className={styles.button}
      disabled={isButtonDisabled}
    >
      Сохранить
    </PrimaryButton>
  );
};
