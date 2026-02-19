import { type FC, HTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface Props extends HTMLAttributes<HTMLDivElement> {
  hidden?: boolean;
}

export const Grid: FC<Props> = ({ hidden, children, ...props }) => {
  return (
    <div
      className={`${styles.grid} ${hidden ? styles.hidden : ""}`}
      {...props}
    >
      {children}
    </div>
  );
};
