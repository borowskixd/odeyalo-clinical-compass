import styles from "./styles.module.scss";
import type { FC } from "react";

interface Props {
  value: string;
  labelText?: string;
}

export const ExerciseTextareaResult: FC<Props> = ({ value, labelText }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {labelText && <span className={styles.labelText}>{labelText}</span>}
        <div className={styles.value}>{value}</div>
      </label>
    </div>
  );
};
