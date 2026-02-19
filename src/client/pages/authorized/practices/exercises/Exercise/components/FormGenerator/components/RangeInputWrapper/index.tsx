import { RangeInput, RangeInputProps } from "@odeyalo/uikit";
import { FC } from "react";
import styles from "./styles.module.scss";

export const RangeInputWrapper: FC<RangeInputProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <RangeInput {...props} />
    </div>
  );
};
