"use client";

import styles from "./styles.module.scss";
import { useFormikContext } from "formik";
import { type FC } from "react";

interface FormValues {
  tracker: number;
}

export const MoodTrackerValue: FC = () => {
  const { values } = useFormikContext<FormValues>();

  const mood = values.tracker;

  return (
    <div className={styles.moodContainer}>
      <div className={styles.mood}>
        {mood >= 70 ? "Отлично" : mood >= 40 ? "Нормально" : "Плохо"}
      </div>
    </div>
  );
};
