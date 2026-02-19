"use client";

import { Button } from "@odeyalo/uikit";
import { useFormikContext } from "formik";
import { type FC } from "react";
import styles from "./styles.module.scss";

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
    <Button
      type="submit"
      className={styles.button}
      disabled={isButtonDisabled}
      view="action"
      width="max"
    >
      Сохранить
    </Button>
  );
};
