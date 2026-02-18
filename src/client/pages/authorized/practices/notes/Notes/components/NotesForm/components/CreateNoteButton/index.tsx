"use client";

import { type FC } from "react";
import styles from "./styles.module.scss";
import { PrimaryButton } from "@/client/components";
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
    <PrimaryButton
      className={styles.button}
      href={createNoteLink}
    >
      Добавить запись
    </PrimaryButton>
  );
};
