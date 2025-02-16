import { Mood } from "../Mood";
import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  moods: { mood: string; time: string }[];
}

export const MoodList: FC<Props> = ({ moods }) => {
  return (
    <div className={styles.list}>
      {moods.map((mood, index) => (
        <Mood
          key={index}
          mood={mood.mood}
          time={mood.time}
        />
      ))}
    </div>
  );
};
