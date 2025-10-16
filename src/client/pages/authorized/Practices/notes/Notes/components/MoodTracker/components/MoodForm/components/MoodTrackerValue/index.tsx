"use client";

import styles from "./styles.module.scss";
import { useFormikContext } from "formik";
import { mapMoodTrackerScoreToMoodStatus } from "@/client/utils";
import { type FC } from "react";

interface FormValues {
  score: number;
}

export const MoodTrackerValue: FC = () => {
  const { values } = useFormikContext<FormValues>();

  return (
    <div className={styles.moodContainer}>
      <div className={styles.mood}>
        {mapMoodTrackerScoreToMoodStatus(values.score)}
      </div>
    </div>
  );
};
