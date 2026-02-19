import { type FC } from "react";
import styles from "./styles.module.scss";
import { pages } from "@/shared/data";

interface NoteProps {
  id: string;
  note: string;
  date: Date;
}

export const Note: FC<NoteProps> = ({ id, note, date }) => {
  const hours = date.getHours() - new Date().getTimezoneOffset() / 60;
  const minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  const time = `${hours}:${minutes}`;

  return (
    <a
      className={styles.note}
      href={pages.note.getLink({ params: { id } })}
    >
      <div className={styles.text}>{note}</div>
      <div className={styles.time}>{time}</div>
    </a>
  );
};
