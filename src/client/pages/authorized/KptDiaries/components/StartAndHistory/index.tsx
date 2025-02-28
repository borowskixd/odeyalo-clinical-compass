"use client";

import styles from "./styles.module.scss";
import {
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
  PrimaryButton,
} from "@/client/components";
import { useGetKptDiariesQuery } from "@/client/redux";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const StartAndHistory: FC = () => {
  const { data: diaries, ...getDiariesStatus } = useGetKptDiariesQuery();
  if (getDiariesStatus.isLoading) return <LoadingLoop />;
  if (getDiariesStatus.isError)
    return <DefaultError error={getDiariesStatus.error} />;

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const currentYear = now.getFullYear();
    if (year === currentYear) {
      return `${day}.${month} ${hours}:${minutes}`;
    } else {
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
  }

  return (
    <section>
      <Container className={styles.textContainer}>
        <PageTitle className={styles.title}>КПТ-Дневник</PageTitle>
        <p className={styles.text}>
          Это способ самоанализа, который позволяет отслеживать эмоции и
          чувства, выявлять взаимосвязи между ситуациями и мыслями.
        </p>
        <PrimaryButton
          href={pages.kptDiaryForm.path}
          className={styles.button}
        >
          Начать
        </PrimaryButton>
      </Container>
      <Container className={styles.historyContainer}>
        <h3 className={styles.hText}>История</h3>
        {diaries && diaries.length === 0 && (
          <p>КПТ-дневник ещё не заполнялся. Самое время это сделать!</p>
        )}
        {diaries && diaries.length > 0 && (
          <div className={styles.diaryList}>
            {diaries.map(({ id, situation, createdAt }) => (
              <div
                key={id}
                className={styles.diaryContainer}
              >
                <p className={styles.DiaryText}>{situation}</p>
                <p className={styles.text}>{formatDate(createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
