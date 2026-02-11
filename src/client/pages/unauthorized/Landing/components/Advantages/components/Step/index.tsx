import styles from "./styles.module.scss";
import { type FC } from "react";

interface StepProps {
  number?: number | string;
}

export const Step: FC<StepProps> = ({ number = "шаг" }) => {
  return (
    <div className={styles.step}>
      {typeof number === "number" ? `${number} шаг` : number}
    </div>
  );
};
