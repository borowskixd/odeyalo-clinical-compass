import styles from "./styles.module.scss";
import { pages } from "@/shared/data";
import { formatDate } from "@/shared/utils";
import { type FC } from "react";

interface Props {
  id: string;
  situation: string;
  createdAt: string;
}

export const Card: FC<Props> = ({ id, situation, createdAt }) => {
  return (
    <a
      className={styles.card}
      href={pages.kptDiaryResults.getLink({ params: { id } })}
    >
      <p className={styles.situation}>{situation}</p>
      <p className={styles.date}>{formatDate(createdAt)}</p>
    </a>
  );
};
