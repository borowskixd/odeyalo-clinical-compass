"use client";

import { MoodRangeValue, ResultItem } from "./components";
import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetKptDiaryQuery } from "@/client/redux";
import { type FC } from "react";

export const Result: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: diary, isLoading, isError, error } = useGetKptDiaryQuery(id);

  if (isLoading) return <LoadingLoop />;
  if (isError || !diary) return <DefaultError error={error} />;

  return (
    <section className={styles.container}>
      <ResultItem
        title={"Опиши ситуацию..."}
        value={diary.situation}
      />
      <ResultItem
        title={"Как ты себя повел?..."}
        value={diary.behavior}
      />
      <ResultItem
        title={"Какие чувства вызвала эта ситуация?..."}
        value={diary.mood}
      />
      <MoodRangeValue
        name="moodLevel"
        value={diary.moodLevel}
      />
      <ResultItem
        title={"Какие были мысли в этот момент?..."}
        value={diary.thoughts}
      />
      <ResultItem
        title={"Как ты подтверждаешь эту мысль?..."}
        value={diary.confirmThoughts}
      />
      <ResultItem
        title={"Как ты опровергаешь эту мысль?..."}
        value={diary.refuteThoughts}
      />
      <ResultItem
        title={"Что ты думаешь об этой ситуации сейчас?..."}
        value={diary.newThoughts}
      />
      <ResultItem
        title={"Какое у тебя сейчас настроение?..."}
        value={diary.newMood}
      />
      <MoodRangeValue
        name="newMoodLevel"
        value={diary.newMoodLevel}
      />
    </section>
  );
};
