"use client";

import { MoodForm, MoodList } from "./components";
import styles from "./styles.module.scss";
import { AddCircle } from "@/client/assets/icons";
import { Button } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate } from "@/client/redux";
import { compareDates } from "@/shared/utils";
import { type FC, useState } from "react";

export const MoodTracker: FC = () => {
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const [formOpened, setFormOpened] = useState<boolean>(false);

  const openFormHandler = () => {
    setFormOpened(true);
  };

  const closeFormHandler = () => {
    setFormOpened(false);
  };

  const moods = [
    {
      mood: "нормально",
      time: "9:28",
    },
  ];

  const isCurrentDate = compareDates(notesCalendarDate, "current", {
    fullYear: true,
    date: true,
    month: true,
  });

  const isFormOpened = formOpened || !moods.length;

  return (
    <div className={styles.mood}>
      <div className={styles.moodHeader}>
        <h3 className={styles.title}>Настроение</h3>
        {!isFormOpened && isCurrentDate && (
          <Button
            onClick={openFormHandler}
            className={styles.addButton}
          >
            <AddCircle />
          </Button>
        )}
      </div>
      {isCurrentDate && isFormOpened && (
        <MoodForm onSubmit={closeFormHandler} />
      )}
      <MoodList moods={moods} />
    </div>
  );
};
