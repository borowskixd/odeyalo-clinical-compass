import cl from "classnames";
import { type FC, type ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
  isLarge?: boolean;
  [key: string]: any;
}

export const Container: FC<Props> = ({
  children,
  className,
  isLarge = false,
  ...props
}) => {
  return (
    <div
      className={cl(styles.container, isLarge ? styles.large : "", className)}
      {...props}
    >
      {children}
    </div>
  );
};
