"use client";

import { NoteList } from "./components/NoteList";
import styles from "./styles.module.scss";
import { PrimaryButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate } from "@/client/redux";
import { compareDates } from "@/shared/utils";
import { type FC } from "react";

export const NotesForm: FC = () => {
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);

  const writeNoteButtonEnabled = compareDates(notesCalendarDate, "current", {
    fullYear: true,
    date: true,
    month: true,
  });

  return (
    <div className={styles.notes}>
      <h2 className={styles.title}>Заметки</h2>
      <NoteList />
      {writeNoteButtonEnabled && (
        <PrimaryButton className={styles.button}>
          Написать заметку
        </PrimaryButton>
      )}
    </div>
  );
};
