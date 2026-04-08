"use client";

import { TextArea, type TextAreaProps } from "@odeyalo/uikit";
import { type FieldConfig, useField } from "formik";
import { type FC } from "react";
import styles from "./styles.module.scss";

type Props = TextAreaProps &
  FieldConfig & {
    labelText?: string;
    exampleText?: string;
  };

export const FormikTextArea: FC<Props> = ({
  labelText,
  exampleText,
  ...props
}) => {
  const [field, meta] = useField(props.name);

  return (
    <div className={styles.label}>
      {(!!labelText || !!exampleText) && (
        <div>
          {!!labelText && (
            <span
              className={`${styles.labelText} ${
                props.required ? styles.required : ""
              }`}
            >
              {labelText}
            </span>
          )}
          {!!exampleText && (
            <span className={styles.exampleText}>{exampleText}</span>
          )}
        </div>
      )}
      <TextArea
        {...props}
        {...field}
        errorMessage={meta.error && meta.touched ? meta.error : undefined}
      />
    </div>
  );
};
