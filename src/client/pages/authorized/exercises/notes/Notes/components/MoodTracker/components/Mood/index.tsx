import styles from "./styles.module.scss";
import { mapMoodTrackerScoreToMoodStatus } from "@/client/utils";
import { type FC } from "react";

interface MoodProps {
  score: number;
  date: Date;
}

export const Mood: FC<MoodProps> = ({ score }) => {
  return (
    <div className={styles.moodContainer}>
      <div className={styles.mood}>
        {mapMoodTrackerScoreToMoodStatus(score)}
      </div>
    </div>
  );
};
