import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  id: string;
  title: string;
  date: string;
  link: string;
}

export const Card: FC<Props> = ({ date, title, link }) => {
  return (
    <a
      className={styles.card}
      href={link}
    >
      <p className={styles.situation}>{title}</p>
      <p className={styles.date}>{date}</p>
    </a>
  );
};
