import cl from "classnames";
import Link from "next/link";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { LockIcon } from "@/client/assets/icons";

interface Props {
  title: string;
  src: string;
  link: string;
  locked?: boolean;
}

export const PracticeCard: FC<Props> = ({
  src,
  title,
  link,
  locked = false,
}) => {
  const content = (
    <>
      <div className={styles.imageContainer}>
        <img
          src={src}
          alt={title}
          className={styles.image}
        />
        {locked && (
          <div className={styles.lockOverlay}>
            <span className={styles.lockIcon}>
              <LockIcon />
            </span>
          </div>
        )}
      </div>
      <h5 className={styles.title}>{title}</h5>
      {locked && (
        <span className={styles.lockedLabel}>
          Сначала выполните предыдущее упражнение
        </span>
      )}
    </>
  );

  if (locked) {
    return (
      <button
        type="button"
        className={cl(styles.card, styles.locked)}
        disabled
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={link}
      className={styles.card}
    >
      {content}
    </Link>
  );
};
