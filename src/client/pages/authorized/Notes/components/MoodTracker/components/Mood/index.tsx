import styles from "./styles.module.scss";
import { type FC } from "react";

interface MoodProps {
  mood: string;
  time: string;
}

export const Mood: FC<MoodProps> = ({ mood, time }) => {
  return (
    <div className={styles.moodContainer}>
      <div className={styles.mood}>{mood}</div>
      <div className={styles.time}>{time}</div>
    </div>
  );
};
