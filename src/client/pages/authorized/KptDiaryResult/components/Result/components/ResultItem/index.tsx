"use client";

import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  title: string;
  value: string;
}

export const ResultItem: FC<Props> = ({ title, value }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <div className={styles.valueContainer}>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};
