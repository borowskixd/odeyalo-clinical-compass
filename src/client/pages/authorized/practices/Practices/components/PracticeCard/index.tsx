import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  title: string;
  src: string;
  link: string;
}

export const PracticeCard: FC<Props> = ({ src, title, link }) => {
  return (
    <Link
      href={link}
      className={styles.card}
    >
      <div className={styles.imageContainer}>
        <img
          src={src}
          alt={title}
          className={styles.image}
        />
      </div>
      <h5 className={styles.title}>{title}</h5>
    </Link>
  );
};
