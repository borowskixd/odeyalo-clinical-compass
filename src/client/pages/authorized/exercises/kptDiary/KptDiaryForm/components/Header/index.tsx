"use client";

import styles from "./styles.module.scss";
import { QuestionMark } from "@/client/assets/icons";
import { PageTitle, SecondaryButton } from "@/client/components";
import { type FC } from "react";

interface Props {
  hint: boolean;
  toggleHintAction: () => void;
}

export const Header: FC<Props> = ({ hint, toggleHintAction }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <PageTitle>КПТ-Дневник</PageTitle>
        <SecondaryButton
          className={hint ? `${styles.button} ${styles.active}` : styles.button}
          onClick={toggleHintAction}
        >
          <QuestionMark />
          Подсказки
        </SecondaryButton>
      </div>
      <p className={styles.text}>
        Это способ самоанализа, который позволяет отслеживать эмоции и чувства,
        выявлять взаимосвязи между ситуациями и мыслями.
      </p>
    </div>
  );
};
