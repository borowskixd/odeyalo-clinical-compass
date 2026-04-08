"use client";

import { RangeInput, RangeInputProps } from "@odeyalo/uikit";
import { type FieldConfig, useField } from "formik";
import { type FC } from "react";

type Props = RangeInputProps & FieldConfig;

export const FormikRangeInput: FC<Props> = (props) => {
  const [field, meta] = useField(props.name);

  return (
    <RangeInput
      {...props}
      {...field}
      errorMessage={meta.error && meta.touched ? meta.error : undefined}
    />
  );
};
