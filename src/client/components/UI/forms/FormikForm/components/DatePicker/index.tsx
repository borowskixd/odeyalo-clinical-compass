"use client";

import { DatePicker, type DatePickerProps } from "@odeyalo/uikit";
import { type FieldConfig, useField } from "formik";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { mapDateToApiDateFormat } from "@/shared/utils";

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
        initialValue={new Date(field.value)}
        onUpdate={(value) => {
          helpers.setValue(mapDateToApiDateFormat(value));
        }}
        errorMessage={meta.error && meta.touched ? meta.error : undefined}
      />
    </div>
  );
};
