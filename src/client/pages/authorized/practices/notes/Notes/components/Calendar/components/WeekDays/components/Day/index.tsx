"use client";

import { useRouter } from "next/navigation";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { notesActions } from "@/client/redux";
import { pages } from "@/shared/data";
import { mapDateToApiDateFormat } from "@/shared/utils";

interface WeekDaysProps {
  date?: Date | null;
  selected?: boolean;
  marked?: boolean;
}

export const Day: FC<WeekDaysProps> = ({
  date = null,
  selected = false,
  marked = false,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const dayClickHandler = () => {
    if (date) {
      dispatch(notesActions.setNotesCalendarDate(date));

      router.push(
        pages.notes.getLink({
          queryParams: {
            date: mapDateToApiDateFormat(date),
          },
        }),
      );
    }
  };

  const isDisabled = !!date && date > new Date();

  return (
    <Button
      className={`${styles.day} ${date && selected && styles.selected} ${date && marked && styles.marked}`}
      onClick={dayClickHandler}
      disabled={isDisabled}
    >
      {date && date.getDate()}
    </Button>
  );
};
