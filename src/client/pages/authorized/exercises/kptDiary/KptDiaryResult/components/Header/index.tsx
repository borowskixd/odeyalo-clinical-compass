import styles from "./styles.module.scss";
import { PageTitle } from "@/client/components";
import { type FC } from "react";

export const Header: FC = () => {
  return (
    <div className={styles.container}>
      <PageTitle className={styles.title}>КПТ-Дневник</PageTitle>
      <p className={styles.text}>
        Это способ самоанализа, который позволяет отслеживать эмоции и чувства,
        выявлять взаимосвязи между ситуациями и мыслями.
      </p>
    </div>
  );
};
