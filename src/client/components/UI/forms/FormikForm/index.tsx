"use client";

import { Form, Formik, type FormikConfig, type FormikValues } from "formik";
import { type ReactNode } from "react";
import {
  FileInput,
  FormikDatePicker,
  FormikPhoneInput,
  FormikTextArea,
  FormikTextInput,
  RangeInput,
} from "./components";
import styles from "./styles.module.scss";

interface Props<Values> extends FormikConfig<Values> {
  children: ReactNode;
  className?: string;
}

export const FormikForm = <Values extends FormikValues = FormikValues>({
  children,
  className = "",
  ...props
}: Props<Values>) => {
  return (
    <Formik<Values> {...props}>
      <Form
        className={`${styles.form} ${className}`}
        noValidate
      >
        {children}
      </Form>
    </Formik>
  );
};

FormikForm.Input = FormikTextInput;
FormikForm.TextArea = FormikTextArea;
FormikForm.DatePicker = FormikDatePicker;
FormikForm.PhoneInput = FormikPhoneInput;
FormikForm.FileInput = FileInput;
FormikForm.RangeInput = RangeInput;
