"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import {
  Container,
  DefaultError,
  FormikForm,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useGetKptDiaryQuery } from "@/client/redux";
import { type FC } from "react";

interface InitialValue {
  moodLevel: number;
}

export const Form: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: diary, isLoading, isError, error } = useGetKptDiaryQuery(id);

  if (isLoading) return <LoadingLoop />;
  if (isError || !diary) return <DefaultError error={error} />;

  const moodLevel: InitialValue = {
    moodLevel: diary.moodLevel,
  };
  const newMoodLevel: InitialValue = {
    moodLevel: diary.newMoodLevel,
  };

  return (
    <section className={styles.sectionStyle}>
      <div className={styles.textContainer}>
        <div className={styles.gridForTitle}>
          <PageTitle className={styles.title}>КПТ-Дневник</PageTitle>
        </div>
        <p className={styles.text}>
          Это способ самоанализа, который позволяет отслеживать эмоции и
          чувства, выявлять взаимосвязи между ситуациями и мыслями.
        </p>
      </div>
      <p className={styles.Text}>Опиши ситуацию...</p>
      <div className={styles.noteInput}>
        <p className={styles.DiaryText}>{diary.situation}</p>
      </div>
      <p className={styles.Text}>Как ты себя повел?...</p>
      <div className={styles.noteInput}>
        <p className={styles.DiaryText}>{diary.behavior}</p>
      </div>
      <p className={styles.Text}>Какие чувства вызвала эта ситуация?...</p>
      <div className={styles.noteInput}>
        <p className={styles.DiaryText}>{diary.mood}</p>
      </div>
      <Container>
        <p className={styles.altText}>Уровень настроения</p>
        <FormikForm<InitialValue>
          onSubmit={() => {}}
          initialValues={moodLevel}
        >
          <FormikForm.RangeInput
            name="moodLevel"
            min="0"
            max="100"
            disabled={true}
          />
        </FormikForm>
      </Container>
      <div className={styles.grid}>
        <p className={styles.leftText}>Ужасно</p>
        <p className={styles.rightText}>Потрясающе</p>
      </div>
      <p className={styles.Text}>Какие были мысли в этот момент?...</p>
      <div className={styles.noteInput}>
        <p className={styles.DiaryText}>{diary.thoughts}</p>
      </div>
      <p className={styles.Text}>Как ты подтверждаешь эту мысль?...</p>
      <div className={styles.noteInput}>
        <p className={styles.DiaryText}>{diary.confirmThoughts}</p>
      </div>
      <p className={styles.Text}>Как ты опровергаешь эту мысль?...</p>
      <div className={styles.noteInput}>
        <p className={styles.DiaryText}>{diary.refuteThoughts}</p>
      </div>
      <p className={styles.Text}>Что ты думаешь об этой ситуации сейчас?...</p>
      <div className={styles.noteInput}>
        <p className={styles.DiaryText}>{diary.newThoughts}</p>
      </div>
      <p className={styles.Text}>Какое у тебя сейчас настроение?...</p>
      <div className={styles.noteInput}>
        <p className={styles.DiaryText}>{diary.newMood}</p>
      </div>
      <Container>
        <p className={styles.altText}>Уровень настроения</p>
        <FormikForm<InitialValue>
          onSubmit={() => {}}
          initialValues={newMoodLevel}
        >
          <FormikForm.RangeInput
            name="moodLevel"
            min="0"
            max="100"
            disabled={true}
          />
        </FormikForm>
      </Container>
      <div className={styles.grid}>
        <p className={styles.leftText}>Ужасно</p>
        <p className={styles.rightText}>Потрясающе</p>
      </div>
    </section>
  );
};
