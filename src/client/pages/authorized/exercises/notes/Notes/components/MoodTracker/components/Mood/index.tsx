import styles from "./styles.module.scss";
import { mapMoodTrackerScoreToMoodStatus } from "@/client/utils";
import { type FC } from "react";

interface MoodProps {
  score: number;
  date: Date;
}

export const Mood: FC<MoodProps> = ({ score, date }) => {
  const hours = date.getHours() - new Date().getTimezoneOffset() / 60;
  const minutes = date.getMinutes();
  const hoursStr = hours < 10 ? "0" + hours : hours;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return (
    <div className={styles.moodContainer}>
      <div className={styles.mood}>
        {mapMoodTrackerScoreToMoodStatus(score)}
      </div>
      <div className={styles.time}>{`${hoursStr}:${minutesStr}`}</div>
    </div>
  );
};
