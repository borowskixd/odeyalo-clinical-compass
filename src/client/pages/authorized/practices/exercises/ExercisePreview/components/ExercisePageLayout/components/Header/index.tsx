import { type FC } from "react";
import styles from "./styles.module.scss";
import { PageTitle, PrimaryButton } from "@/client/components";

interface Props {
  title: string;
  description?: string;
  startLink: string;
}

export const Header: FC<Props> = ({ title, description, startLink }) => {
  return (
    <div className={styles.textContainer}>
      <PageTitle>{title}</PageTitle>
      {description && <p className={styles.text}>{description}</p>}
      <PrimaryButton
        href={startLink}
        className={styles.button}
      >
        Начать
      </PrimaryButton>
    </div>
  );
};
