"use client";

import { Button } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate } from "@/client/redux";
import { pages } from "@/shared/data";
import { mapDateToApiDateFormat } from "@/shared/utils";

export const CreateNoteButton: FC = () => {
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);

  const createNoteLink = pages.createNote.getLink({
    queryParams: {
      date: mapDateToApiDateFormat(notesCalendarDate),
    },
  });

  return (
    <Button
      className={styles.button}
      href={createNoteLink}
      view="action"
      width="max"
    >
      Добавить запись
    </Button>
  );
};
