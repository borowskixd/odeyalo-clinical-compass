"use client";

import { Note } from "../Note";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import {
  selectNotesCalendarDate,
  useGetNotesByDateQuery,
} from "@/client/redux";
import { type FC } from "react";

export const NoteList: FC = () => {
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useGetNotesByDateQuery(notesCalendarDate);

  if (isLoading) return <LoadingLoop />;
  if (isError || !notes) return <DefaultError error={error} />;

  return (
    <div className={`${styles.list} ${!notes.length && styles.empty}`}>
      {!notes.length && <p>Напиши, как прошёл день, как себя чувствуешь :)</p>}
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          note={note.note}
          date={new Date(note.date)}
        />
      ))}
    </div>
  );
};
