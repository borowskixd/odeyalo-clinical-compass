"use client";

import Link from "next/link";
import { type FC, type ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  children: ReactNode;
  className?: string;
  href?: string | null;
  [key: string]: any;
}

export const Button: FC<Props> = ({
  children,
  className = "",
  href = null,
  ...props
}) => {
  return href === null ? (
    <button
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </button>
  ) : (
    <Link
      href={href}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};
