// client/components/Header/Header.tsx
"use client";

import { type FC, useRef, useState } from "react";
import { YearPickerButton } from "./components";
import styles from "./styles.module.scss";
import { ArrowLeft, ArrowRight } from "@/client/assets/icons";
import { Button } from "@/client/components";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import { notesActions, selectNotesCalendarDate } from "@/client/redux";
import { compareDates, months } from "@/shared/utils";

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const yearButtonRef = useRef<HTMLSpanElement>(null);

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

  const currentYear = notesCalendarDate.getFullYear();
  const currentMonth = notesCalendarDate.getMonth();

  const handleYearClick = () => {
    setIsYearPickerOpen(!isYearPickerOpen);
  };

  const handleYearSelect = (year: number) => {
    const newDate = new Date(year, currentMonth, 1);
    dispatch(notesActions.setNotesCalendarDate(newDate));
    setIsYearPickerOpen(false);
  };

  const handleClosePicker = () => {
    setIsYearPickerOpen(false);
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>
          {months[notesCalendarDate.getMonth()]}{" "}
          <span
            ref={yearButtonRef}
            className={`${styles.year} ${isYearPickerOpen ? styles.active : ""}`}
            onClick={handleYearClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleYearClick();
              }
            }}
          >
            {notesCalendarDate.getFullYear()}
          </span>
        </h2>
        {isYearPickerOpen && (
          <YearPickerButton
            currentYear={currentYear}
            onYearSelect={handleYearSelect}
            onClose={handleClosePicker}
          />
        )}
      </div>
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
