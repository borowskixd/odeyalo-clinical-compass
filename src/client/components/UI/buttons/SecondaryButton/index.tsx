"use client";

import { type FC, type ReactNode } from "react";
import { AppButton } from "../AppButton";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}

export const SecondaryButton: FC<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <AppButton
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </AppButton>
  );
};
