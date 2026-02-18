import { type FC, type HTMLAttributes } from "react";
import styles from "./styles.module.scss";

type ContentWrapperProps = HTMLAttributes<HTMLDivElement>;

export const ContentWrapper: FC<ContentWrapperProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`${styles.contentWrapper} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
