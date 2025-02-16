import styles from "./styles.module.scss";
import { type FC } from "react";

interface NoteProps {
  text: string;
  time: string;
}

export const Note: FC<NoteProps> = ({ text, time }) => {
  return (
    <div className={styles.note}>
      <div className={styles.text}>{text}</div>
      <div className={styles.time}>{time}</div>
    </div>
  );
};
