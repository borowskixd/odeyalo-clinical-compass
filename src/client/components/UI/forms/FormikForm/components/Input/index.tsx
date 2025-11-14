"use client";

import styles from "./styles.module.scss";
import { type FieldConfig, useField } from "formik";
import { TextInput, type TextInputProps } from "@odeyalo/uikit";
import { type FC } from "react";

type FormikInputProps = TextInputProps &
  FieldConfig & {
    labelText?: string;
    exampleText?: string;
  };

export const FormikTextInput: FC<FormikInputProps> = ({
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
      <TextInput
        {...field}
        {...props}
        errorMessage={meta.error && meta.touched ? meta.error : undefined}
      />
    </div>
  );
};
