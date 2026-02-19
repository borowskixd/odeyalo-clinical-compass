import { type FC } from "react";
import styles from "./styles.module.scss";
import { PrimaryButton } from "@/client/components";
import { pages } from "@/shared/data";

export const RightButton: FC = () => {
  return (
    <PrimaryButton
      className={styles.button}
      href={pages.login.path}
    >
      Войти
    </PrimaryButton>
  );
};
