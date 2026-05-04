"use client";

import { type FieldConfig, useField } from "formik";
import { type ComponentProps, type FC } from "react";
import styles from "./styles.module.scss";

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

type Props = Omit<ComponentProps<"select">, "children"> &
  FieldConfig & {
    labelText?: string;
    exampleText?: string;
    placeholder?: string;
    options: SelectOption[];
  };

export const FormikSelect: FC<Props> = ({
  labelText,
  exampleText,
  placeholder,
  options,
  ...props
}) => {
  const [field, meta] = useField<string>(props.name);
  const hasError = Boolean(meta.touched && meta.error);

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
      <span className={styles.field}>
        <label
          className={`${styles.selectWrapper} ${
            hasError ? styles.error : ""
          } ${props.disabled ? styles.disabled : ""}`}
        >
          <select
            {...field}
            {...props}
            className={`${styles.select} ${
              !field.value ? styles.placeholder : ""
            }`}
          >
            {!!placeholder && (
              <option
                value=""
                disabled
              >
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </span>
      {hasError && <span className={styles.errorText}>{meta.error}</span>}
    </div>
  );
};
