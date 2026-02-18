"use client";

import { type FC, type ReactNode } from "react";
import { Button } from "../Button";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
  isMedium?: boolean;
  [key: string]: any;
}

export const AppButton: FC<Props> = ({
  children,
  className = "",
  isMedium = false,
  ...props
}) => {
  return (
    <Button
      className={`${styles.button} ${className} ${
        isMedium ? styles.medium : ""
      }`}
      {...props}
    >
      {children}
    </Button>
  );
};
