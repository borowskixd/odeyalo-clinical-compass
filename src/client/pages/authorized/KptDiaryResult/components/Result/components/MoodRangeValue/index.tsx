"use client";

import styles from "./styles.module.scss";
import type { FieldConfig } from "formik";
import { RangeInput } from "@/client/components";
import { type FC, type InputHTMLAttributes } from "react";

type Props = FieldConfig & InputHTMLAttributes<HTMLInputElement>;

export const MoodRangeValue: FC<Props> = ({ ...props }) => {
  return (
    <div className={styles.container}>
      <h6 className={styles.title}>Уровень настроения</h6>
      <RangeInput
        min="0"
        max="100"
        {...props}
        disabled
      />
      <div className={styles.moods}>
        <span>Ужасно</span>
        <span>Потрясающе</span>
      </div>
    </div>
  );
};
