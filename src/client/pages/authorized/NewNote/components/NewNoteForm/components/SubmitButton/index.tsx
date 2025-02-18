"use client";

import styles from "./styles.module.scss";
import { useFormikContext } from "formik";
import { PrimaryButton } from "@/client/components";
import { type FC } from "react";

interface FormValues {
  note: string;
}

export const SubmitButton: FC = () => {
  const { values } = useFormikContext<FormValues>();

  const isButtonDisabled = values.note === "";

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
