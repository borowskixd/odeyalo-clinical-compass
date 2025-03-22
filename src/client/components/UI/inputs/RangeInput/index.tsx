"use client";

import styles from "./styles.module.scss";
import { type CSSProperties, type FC, type InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const RangeInput: FC<Props> = ({ ...props }) => {
  const value = Number(props?.value ?? props?.min ?? 0);
  const progress = `${(value / 100) * 100}%`;

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
