"use client";

import { type CSSProperties, type FC, type InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const RangeInput: FC<Props> = ({ ...props }) => {
  const value = Number(props?.value ?? props?.min ?? 0);
  const progress = `${(value / +(props?.max ?? 100)) * 100}%`;

  return (
    <div className={styles.rangeInput}>
      <input
        {...props}
        type="range"
        className={`${styles.input} ${props.className ?? ""}`}
        style={{ "--progress": progress, ...props.style } as CSSProperties}
      />
    </div>
  );
};
