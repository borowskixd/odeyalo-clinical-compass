import styles from "./styles.module.scss";
import type { FieldConfig } from "formik";
import { FormikForm } from "@/client/components";
import type { FC, TextareaHTMLAttributes } from "react";

type Props = FieldConfig &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hintText?: string;
    labelText?: string;
  };

export const ExerciseTextarea: FC<Props> = ({
  hintText,
  labelText,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {labelText && <span className={styles.labelText}>{labelText}</span>}
        <FormikForm.Textarea {...props} />
      </label>
      {hintText && <p className={styles.hint}>{hintText}</p>}
    </div>
  );
};
