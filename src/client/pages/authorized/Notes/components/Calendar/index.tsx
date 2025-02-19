"use client";

import { Day, Header, WeekDays } from "./components";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import {
  notesActions,
  selectNotesCalendarDate,
  useGetNotesCalendarFilledDatesQuery,
} from "@/client/redux";
import { compareDates } from "@/shared/utils";
import { type FC } from "react";

export const Calendar: FC = () => {
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const dispatch = useAppDispatch();
  const { data: calendarFilledDates } = useGetNotesCalendarFilledDatesQuery();

  const prevMonthHandler = () => {
    const date = new Date(
      notesCalendarDate.getFullYear(),
      notesCalendarDate.getMonth() - 1,
      1,
    );
    dispatch(notesActions.setNotesCalendarDate(date));
  };

  const nextMonthHandler = () => {
    const date = new Date(
      notesCalendarDate.getFullYear(),
      notesCalendarDate.getMonth() + 1,
      1,
    );
    dispatch(notesActions.setNotesCalendarDate(date));
  };

  const dayClickHandler = (date: Date) => {
    dispatch(notesActions.setNotesCalendarDate(date));
  };

  const renderDays = () => {
    const daysInMonth = new Date(
      notesCalendarDate.getFullYear(),
      notesCalendarDate.getMonth() + 1,
      0,
    ).getDate();
    const firstMonthDay = new Date(
      notesCalendarDate.getFullYear(),
      notesCalendarDate.getMonth(),
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
      el.map((dateDay) => {
        const date = dateDay
          ? new Date(
              notesCalendarDate.getFullYear(),
              notesCalendarDate.getMonth(),
              dateDay,
            )
          : null;

        const marked =
          !!calendarFilledDates &&
          !!date &&
          !!calendarFilledDates.find((calendarFilledDate) =>
            compareDates(new Date(calendarFilledDate), date, {
              fullYear: true,
              month: true,
              date: true,
            }),
          );

        return (
          <Day
            key={`${index} ${date}`}
            date={date}
            selected={notesCalendarDate.getDate() === dateDay}
            onClick={dayClickHandler}
            marked={marked}
          />
        );
      }),
    );
  };

  return (
    <div className={styles.calendar}>
      <Header
        date={notesCalendarDate}
        prevMonthHandler={prevMonthHandler}
        nextMonthHandler={nextMonthHandler}
      />
      <WeekDays days={renderDays()} />
    </div>
  );
};
