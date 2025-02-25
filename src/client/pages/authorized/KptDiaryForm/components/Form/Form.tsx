"use client";

import styles from "./styles.module.scss";
import { Container, PageTitle } from "@/client/components";
import { useSendKptDiaryMutation } from "@/client/redux";
import { type FC } from "react";

export const Form: FC = () => {
  return (
    <section>
      <Container className={styles.textContainer}>
        <PageTitle className={styles.title}>КПТ-Дневник</PageTitle>
        <p className={styles.text}>
          Это способ самоанализа, который позволяет отслеживать эмоции и
          выявлять взаимосвязи между ситуациями и мыслями.
        </p>
      </Container>
    </section>
  );
};
