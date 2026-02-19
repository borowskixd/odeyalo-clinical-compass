import { type FC } from "react";
import styles from "./styles.module.scss";

interface Props {
  problem: string;
}

export const Symptom: FC<Props> = ({ problem }) => {
  return <span className={styles.problem}>{problem}</span>;
};
