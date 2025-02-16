import { MoodTrackerValue } from "./components";
import styles from "./styles.module.scss";
import { FormikForm, PrimaryButton } from "@/client/components";
import { type FC } from "react";

interface Props {
  onSubmit: () => void;
}

interface InitialValues {
  tracker: number;
}

const initialValues: InitialValues = {
  tracker: 50,
};

export const MoodForm: FC<Props> = ({ onSubmit }) => {
  const submitHandler = (values: InitialValues) => {
    console.log(values);
    onSubmit();
  };

  return (
    <FormikForm<InitialValues>
      initialValues={initialValues}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <MoodTrackerValue />
      <FormikForm.RangeInput
        name="tracker"
        min="0"
        max="100"
      />
      <PrimaryButton
        type="submit"
        className={styles.button}
      >
        Сохранить
      </PrimaryButton>
    </FormikForm>
  );
};
