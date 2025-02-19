"use client";

import styles from "./styles.module.scss";
import { ArrowLeft, ArrowRight } from "@/client/assets/icons";
import { Button } from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import { notesActions, selectNotesCalendarDate } from "@/client/redux";
import { compareDates, months } from "@/shared/utils";
import { type FC } from "react";

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);

  const prevMonthHandler = () => {
    const prevDate = new Date(
      notesCalendarDate.getFullYear(),
      notesCalendarDate.getMonth() - 1,
      1,
    );
    dispatch(notesActions.setNotesCalendarDate(prevDate));
  };

  const nextMonthHandler = () => {
    const nextDate = new Date(
      notesCalendarDate.getFullYear(),
      notesCalendarDate.getMonth() + 1,
      1,
    );

    if (compareDates(nextDate, "current", { fullYear: true, month: true })) {
      nextDate.setDate(new Date().getDate());
    }

    dispatch(notesActions.setNotesCalendarDate(nextDate));
  };

  const isCurrentMonth = compareDates(notesCalendarDate, "current", {
    fullYear: true,
    month: true,
  });

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        {months[notesCalendarDate.getMonth()]} {notesCalendarDate.getFullYear()}
      </h2>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          onClick={prevMonthHandler}
        >
          <ArrowLeft />
        </Button>
        <Button
          className={styles.button}
          onClick={nextMonthHandler}
          disabled={isCurrentMonth}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
