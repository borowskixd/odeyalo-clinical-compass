"use client";

import { useSearchParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { Header, WeekDays } from "./components";
import styles from "./styles.module.scss";
import { useAppDispatch } from "@/client/hooks";
import { notesActions } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { compareDates } from "@/shared/utils";

export const Calendar: FC = () => {
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("emotions-diary-page-opened");
  }, [logEvent]);

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
