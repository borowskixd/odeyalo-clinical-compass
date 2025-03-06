import styles from "./styles.module.scss";
import { PageTitle, PrimaryButton } from "@/client/components";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const TextAndStart: FC = () => {
  return (
    <div className={styles.textContainer}>
      <PageTitle className={styles.title}>КПТ-Дневник</PageTitle>
      <p className={styles.text}>
        Это способ самоанализа, который позволяет отслеживать эмоции и чувства,
        выявлять взаимосвязи между ситуациями и мыслями.
      </p>
      <PrimaryButton
        href={pages.kptDiaryForm.path}
        className={styles.button}
      >
        Начать
      </PrimaryButton>
    </div>
  );
};
