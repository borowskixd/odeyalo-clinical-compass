"use client";

import { Header, WeekDays } from "./components";
import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/client/hooks";
import { notesActions } from "@/client/redux";
import { compareDates } from "@/shared/utils";
import { type FC, useEffect } from "react";

export const Calendar: FC = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (
      dateParam &&
      !isNaN(new Date(dateParam).valueOf()) &&
      new Date() > new Date(dateParam) &&
      !compareDates(new Date(dateParam), "current", {
        fullYear: true,
        month: true,
        date: true,
      })
    ) {
      dispatch(notesActions.setNotesCalendarDate(new Date(dateParam)));
    }
  }, [searchParams, dispatch]);

  return (
    <div className={styles.calendar}>
      <Header />
      <WeekDays />
    </div>
  );
};
