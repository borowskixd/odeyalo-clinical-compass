import { type FC } from "react";
import styles from "./styles.module.scss";
import { LoadingIcon } from "@/client/assets/icons";

export const LoadingLoop: FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loadingIcon}>
        <LoadingIcon />
      </div>
    </div>
  );
};
