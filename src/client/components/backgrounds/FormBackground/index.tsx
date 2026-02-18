import { type FC } from "react";
import styles from "./styles.module.scss";
import { Feather } from "@/client/assets/icons";

export const FormBackground: FC = () => {
  return (
    <div className={styles.background}>
      <div className={styles.iconsContainer}>
        <Feather className={styles.feather1} />
        <Feather className={styles.feather2} />
      </div>
    </div>
  );
};
