"use client";

import { PhoneInput, type PhoneInputProps } from "@odeyalo/uikit";
import { type FieldConfig, useField } from "formik";
import { type FC } from "react";
import styles from "./styles.module.scss";

type Props = PhoneInputProps &
  FieldConfig & {
    labelText?: string;
    exampleText?: string;
  };

export const FormikPhoneInput: FC<Props> = ({
  labelText,
  exampleText,
  ...props
}) => {
  const [field, meta, helpers] = useField(props.name);

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
      <PhoneInput
        {...field}
        {...props}
        onUpdate={(value) => {
          helpers.setValue(value.digits);
        }}
        errorMessage={meta.error && meta.touched ? meta.error : undefined}
      />
    </div>
  );
};
