"use client";

import { Day, WeekDays } from "./components";
import styles from "./styles.module.scss";
import { type FC, useState } from "react";

export const Calendar: FC = () => {
  const [selectedDate, setSelectedDate] = useState<number>(26);

  const dayClickHandler = (date: number) => {
    setSelectedDate(date);
  };

  const renderDays = () => {
    const date = new Date();
    const daysInMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();
    const firstWeekDay =
      new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay() - 1;

    const days: Array<number | null>[] = [];

    for (let i = 0; i < firstWeekDay; i++) days[i] = [null];

    for (let i: number = 0; i < daysInMonth; i++) {
      const weekDay: number = (firstWeekDay + i) % 7;

      if (!Array.isArray(days[weekDay])) days[weekDay] = [i + 1];
      else days[weekDay].push(i + 1);
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
      <h2 className={styles.title}>Ноябрь 2025</h2>
      <div className={styles.weekDays}>
        <WeekDays days={renderDays()} />
      </div>
    </div>
  );
};
