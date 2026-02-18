"use client";

import { useFormikContext } from "formik";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { PrimaryButton } from "@/client/components";

interface FormValues {
  note: string;
}

interface Props {
  disabled: boolean;
}

export const SubmitButton: FC<Props> = ({ disabled }) => {
  const { values } = useFormikContext<FormValues>();

  const isButtonDisabled = values.note === "" || disabled;

  return (
    <PrimaryButton
      type="submit"
      className={styles.button}
      disabled={isButtonDisabled}
    >
      Сохранить
    </PrimaryButton>
  );
};
