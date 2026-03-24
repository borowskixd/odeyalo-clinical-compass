import { Button } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { PageTitle } from "@/client/components";

interface Props {
  title: string;
  description?: string;
  startLink: string;
  completed?: boolean;
}

export const Header: FC<Props> = ({
  title,
  description,
  startLink,
  completed = false,
}) => {
  return (
    <div className={styles.textContainer}>
      <PageTitle>{title}</PageTitle>
      {description && <p className={styles.text}>{description}</p>}
      <Button
        href={startLink}
        className={styles.button}
        view="primary"
        width="max"
        disabled={completed}
      >
        {completed ? "Вы уже выполнили данное упражнение" : "Начать"}
      </Button>
    </div>
  );
};
