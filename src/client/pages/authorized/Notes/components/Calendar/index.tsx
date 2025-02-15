"use client";

import { Day, Header, WeekDays } from "./components";
import styles from "./styles.module.scss";
import { type FC, useState } from "react";

export const Calendar: FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<number>(date.getDate());

  const prevMonthHandler = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    setSelectedDate(1);
  };

  const nextMonthHandler = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    setSelectedDate(1);
  };

  const dayClickHandler = (date: number) => {
    setSelectedDate(date);
  };

  const renderDays = () => {
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const firstMonthDay = new Date(
      date.getFullYear(),
      date.getMonth(),
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
            selected={selectedDate === date}
            onClick={dayClickHandler}
          />
        );
      }),
    );
  };

  return (
    <div className={styles.calendar}>
      <Header
        date={date}
        prevMonthHandler={prevMonthHandler}
        nextMonthHandler={nextMonthHandler}
      />
      <div className={styles.weekDays}>
        <WeekDays days={renderDays()} />
      </div>
    </div>
  );
};
