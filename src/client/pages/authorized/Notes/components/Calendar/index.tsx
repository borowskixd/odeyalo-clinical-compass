"use client";

import { Day, Header, WeekDays } from "./components";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import { notesActions, selectNotesCalendarDate } from "@/client/redux";
import { type FC } from "react";

export const Calendar: FC = () => {
  const currentDate = useAppSelector(selectNotesCalendarDate);
  const dispatch = useAppDispatch();

  const prevMonthHandler = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    dispatch(notesActions.setNotesCalendarDate(date));
  };

  const nextMonthHandler = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    dispatch(notesActions.setNotesCalendarDate(date));
  };

  const dayClickHandler = (dateDay: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dateDay,
    );
    dispatch(notesActions.setNotesCalendarDate(date));
  };

  const renderDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    const firstMonthDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
    const firstWeekDay = firstMonthDay === 0 ? 6 : firstMonthDay - 1;

    const days: Array<number | null>[] = [];

    for (let i = 0; i < daysInMonth + firstWeekDay; i++) {
      if (i < firstWeekDay) days[i] = [null];
      else {
        const weekDay: number = i % 7;

        if (!Array.isArray(days[weekDay]))
          days[weekDay] = [i - firstWeekDay + 1];
        else days[weekDay].push(i - firstWeekDay + 1);
      }
    }

    return days.map((el, index) =>
      el.map((date) => {
        return (
          <Day
            key={`${index} ${date}`}
            date={date}
            selected={currentDate.getDate() === date}
            onClick={dayClickHandler}
          />
        );
      }),
    );
  };

  return (
    <div className={styles.calendar}>
      <Header
        date={currentDate}
        prevMonthHandler={prevMonthHandler}
        nextMonthHandler={nextMonthHandler}
      />
      <div className={styles.weekDays}>
        <WeekDays days={renderDays()} />
      </div>
    </div>
  );
};
