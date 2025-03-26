"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { DefaultError, LoadingLoop } from "@/client/components";
import {
  ExerciseMoodRangeInputResult,
  ExerciseTextareaResult,
} from "@/client/pages/authorized/exercises/components";
import { useGetKptDiaryQuery } from "@/client/redux";
import { type FC } from "react";

export const Result: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: diary, isLoading, isError, error } = useGetKptDiaryQuery(id);

  if (isLoading) return <LoadingLoop />;
  if (isError || !diary) return <DefaultError error={error} />;

  return (
    <section className={styles.container}>
      <ExerciseTextareaResult
        labelText={"Опиши ситуацию..."}
        value={diary.situation}
      />
      <ExerciseTextareaResult
        labelText={"Как ты себя повел?..."}
        value={diary.behavior}
      />
      <ExerciseTextareaResult
        labelText={"Какие чувства вызвала эта ситуация?..."}
        value={diary.mood}
      />
      <ExerciseMoodRangeInputResult
        name="moodLevel"
        value={diary.moodLevel}
      />
      <ExerciseTextareaResult
        labelText={"Какие были мысли в этот момент?..."}
        value={diary.thoughts}
      />
      <ExerciseTextareaResult
        labelText={"Как ты подтверждаешь эту мысль?..."}
        value={diary.confirmThoughts}
      />
      <ExerciseTextareaResult
        labelText={"Как ты опровергаешь эту мысль?..."}
        value={diary.refuteThoughts}
      />
      <ExerciseTextareaResult
        labelText={"Что ты думаешь об этой ситуации сейчас?..."}
        value={diary.newThoughts}
      />
      <ExerciseTextareaResult
        labelText={"Какое у тебя сейчас настроение?..."}
        value={diary.newMood}
      />
      <ExerciseMoodRangeInputResult
        name="newMoodLevel"
        value={diary.newMoodLevel}
      />
    </section>
  );
};
