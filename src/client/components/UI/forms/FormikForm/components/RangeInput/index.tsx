"use client";

import styles from "./styles.module.scss";
import { type FieldConfig, useField } from "formik";
import { type CSSProperties, type FC, type InputHTMLAttributes } from "react";

type Props = FieldConfig & InputHTMLAttributes<HTMLInputElement>;

export const RangeInput: FC<Props> = ({ ...props }) => {
  const [field] = useField(props.name);

  const progress = `${(field.value / 100) * 100}%`;

  return (
    <div className={styles.rangeInput}>
      <input
        {...field}
        {...props}
        type="range"
        className={`${styles.input} ${props.className}`}
        style={{ "--progress": progress, ...props.style } as CSSProperties}
      />
    </div>
  );
};
