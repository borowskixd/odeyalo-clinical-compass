"use client";

import { useFormikContext } from "formik";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { mapMoodTrackerScoreToMoodStatus } from "@/client/utils";

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
