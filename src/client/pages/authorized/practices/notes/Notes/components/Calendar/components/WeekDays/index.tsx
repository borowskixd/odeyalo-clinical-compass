"use client";

import { type FC } from "react";
import { Day, WeekDay } from "./components";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/client/hooks";
import {
  selectNotesCalendarDate,
  useGetNotesCalendarFilledDatesQuery,
} from "@/client/redux";
import { compareDates } from "@/shared/utils";

export const WeekDays: FC = () => {
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const { data: calendarFilledDates } = useGetNotesCalendarFilledDatesQuery();

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
            marked={marked}
          />
        );
      }),
    );
  };

  const days = renderDays();

  return (
    <div className={styles.weekDays}>
      <WeekDay
        weekDay="ПН"
        days={days[0]}
      />
      <WeekDay
        weekDay="ВТ"
        days={days[1]}
      />
      <WeekDay
        weekDay="СР"
        days={days[2]}
      />
      <WeekDay
        weekDay="ЧТ"
        days={days[3]}
      />
      <WeekDay
        weekDay="ПТ"
        days={days[4]}
      />
      <WeekDay
        weekDay="СБ"
        days={days[5]}
      />
      <WeekDay
        weekDay="ВС"
        days={days[6]}
      />
    </div>
  );
};
