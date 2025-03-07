"use client";

import styles from "./styles.module.scss";
import type { FieldConfig } from "formik";
import { FormikForm } from "@/client/components";
import { type FC, type TextareaHTMLAttributes } from "react";

type Props = FieldConfig &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hint: boolean;
    hintText: string;
    labelText?: string;
    exampleText?: string;
  };

export const TextareaWithHint: FC<Props> = ({ hint, hintText, ...props }) => {
  return (
    <div className={styles.container}>
      <FormikForm.Textarea {...props} />
      {hint && <p className={styles.hintText}>{hintText}</p>}
    </div>
  );
};
