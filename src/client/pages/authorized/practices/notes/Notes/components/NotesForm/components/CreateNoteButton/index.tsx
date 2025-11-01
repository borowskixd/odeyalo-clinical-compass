"use client";

import styles from "./styles.module.scss";
import { PrimaryButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate } from "@/client/redux";
import { pages } from "@/shared/data";
import { mapDateToApiDateFormat } from "@/shared/utils";
import { type FC } from "react";

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
      Написать заметку
    </PrimaryButton>
  );
};
