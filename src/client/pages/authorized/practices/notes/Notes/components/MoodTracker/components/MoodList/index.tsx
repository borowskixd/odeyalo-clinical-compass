"use client";

import { type FC } from "react";
import { Mood } from "../Mood";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate, useGetMoodsQuery } from "@/client/redux";

export const MoodList: FC = () => {
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const {
    data: moods,
    isLoading,
    isError,
    error,
  } = useGetMoodsQuery(notesCalendarDate);

  if (isLoading) return <LoadingLoop />;
  if (isError || !moods) return <DefaultError error={error} />;

  return (
    <div className={styles.list}>
      {moods.map((mood) => {
        return (
          <Mood
            key={mood.id}
            moodId={mood.id}
            score={mood.score}
            date={new Date(mood.date)}
            emojis={mood.emojis.map((el) => el.emoji)}
          />
        );
      })}
    </div>
  );
};
