import styles from "./styles.module.scss";
import Link from "next/link";
import { Switch } from "@/client/components";
import { type FC } from "react";

interface Props {
  label: string;
  link: string;
  className?: string;
  [key: string]: any;
}

export const ListItemWithSwitch: FC<Props> = ({
  label,
  link,
  className = "",
  ...props
}) => {
  return (
    <li className={`${styles.item} ${className}`}>
      <Switch
        className={styles.switch}
        {...props}
      />
      <span className={styles.label}>{label}</span>
      <Link
        className={styles.link}
        href={link}
      >
        Перейти
      </Link>
    </li>
  );
};
