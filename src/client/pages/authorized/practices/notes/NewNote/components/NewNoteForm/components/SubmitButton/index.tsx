"use client";

import styles from "./styles.module.scss";
import { useFormikContext } from "formik";
import { PrimaryButton } from "@/client/components";
import { type FC } from "react";

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
