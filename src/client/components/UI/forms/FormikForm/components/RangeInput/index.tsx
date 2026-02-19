"use client";

import { type FieldConfig, useField } from "formik";
import { type FC, type InputHTMLAttributes } from "react";
import { RangeInput as DefaultRangeInput } from "@/client/components";

type Props = FieldConfig & InputHTMLAttributes<HTMLInputElement>;

export const RangeInput: FC<Props> = ({ ...props }) => {
  const [field] = useField(props.name);

  return (
    <DefaultRangeInput
      {...field}
      {...props}
    />
  );
};
