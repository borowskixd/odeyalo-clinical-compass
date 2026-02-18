import { type FC, type ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  hidden?: boolean;
  children: ReactNode;
}

export const Grid: FC<Props> = ({ hidden, children }) => {
  return (
    <div className={`${styles.grid} ${hidden ? styles.hidden : ""}`}>
      {children}
    </div>
  );
};
