"use client";

import styles from "./styles.module.scss";
import { type FieldConfig, useField } from "formik";
import { DatePicker, type DatePickerProps } from "@odeyalo/uikit";
import { type FC } from "react";

type Props = DatePickerProps &
  FieldConfig & {
    labelText?: string;
    exampleText?: string;
  };

export const FormikDatePicker: FC<Props> = ({
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
      <DatePicker
        {...field}
        {...props}
        onUpdate={(value) => {
          helpers.setValue(value);
        }}
        errorMessage={meta.error && meta.touched ? meta.error : undefined}
      />
    </div>
  );
};
