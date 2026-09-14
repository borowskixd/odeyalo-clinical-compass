import { type FC } from "react";
import styles from "./styles.module.scss";
import { mapMoodTrackerScoreToMoodStatus } from "@/client/utils";

interface MoodProps {
  score: number;
  date: Date;
  emojis: string[];
}

export const Mood: FC<MoodProps> = ({ score, date, emojis }) => {
  const hours = date.getHours() - new Date().getTimezoneOffset() / 60;
  const minutes = date.getMinutes();
  const hoursStr = hours < 10 ? "0" + hours : hours;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  const status = mapMoodTrackerScoreToMoodStatus(score);

  return (
    <div className={styles.container}>
      <div className={`${styles.moodContainer} ${styles[status]}`}>
        <div className={styles.mood}>{score} из 100</div>
        <div className={styles.time}>{`${hoursStr}:${minutesStr}`}</div>
      </div>
      <div className={styles.emojisContainer}>
        {emojis.map((emoji) => (
          <div
            className={styles.emoji}
            key={emoji}
          >
            {emoji}
          </div>
        ))}
      </div>
    </div>
  );
};
