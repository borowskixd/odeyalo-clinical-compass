import styles from "./styles.module.scss";
import { type ReactNode } from "react";

export default function UnauthorizedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className={styles.body}>{children}</div>;
}
