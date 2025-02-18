"use client";

import { NoteList } from "./components/NoteList";
import styles from "./styles.module.scss";
import { PrimaryButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate } from "@/client/redux";
import { pages } from "@/shared/data";
import { mapDateToApiDateFormat } from "@/shared/utils";
import { type FC } from "react";

export const NotesForm: FC = () => {
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);

  const createNoteLink = pages.createNote.getLink({
    queryParams: {
      date: mapDateToApiDateFormat(notesCalendarDate),
    },
  });

  return (
    <div className={styles.notes}>
      <h2 className={styles.title}>Заметки</h2>
      <NoteList />
      <PrimaryButton
        className={styles.button}
        href={createNoteLink}
      >
        Написать заметку
      </PrimaryButton>
    </div>
  );
};
