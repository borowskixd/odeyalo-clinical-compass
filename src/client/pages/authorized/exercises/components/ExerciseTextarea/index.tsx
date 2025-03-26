import styles from "./styles.module.scss";
import type { FieldConfig } from "formik";
import { FormikForm } from "@/client/components";
import type { FC, TextareaHTMLAttributes } from "react";

type Props = FieldConfig &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    hint?: boolean;
    hintText?: string;
    labelText?: string;
  };

export const ExerciseTextarea: FC<Props> = ({
  hint = true,
  hintText,
  labelText,
  ...props
}) => {
  const hintVisible = hint && !!hintText;

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {labelText && <span className={styles.labelText}>{labelText}</span>}
        <FormikForm.Textarea {...props} />
      </label>
      {hintVisible && <p className={styles.hint}>{hintText}</p>}
    </div>
  );
};
