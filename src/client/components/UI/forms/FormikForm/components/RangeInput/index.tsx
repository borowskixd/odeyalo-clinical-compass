"use client";

import { type FieldConfig, useField } from "formik";
import { RangeInput as DefaultRangeInput } from "@/client/components";
import { type FC, type InputHTMLAttributes } from "react";

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
