"use client";

import { type FC, useEffect, useState } from "react";
import { MoodForm, MoodList } from "./components";
import styles from "./styles.module.scss";
import { AddCircle } from "@/client/assets/icons";
import { Button } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate, useGetMoodsQuery } from "@/client/redux";

export const MoodTracker: FC = () => {
  const [formOpened, setFormOpened] = useState<boolean>(false);
  const notesCalendarDate = useAppSelector(selectNotesCalendarDate);
  const { data: moods } = useGetMoodsQuery(notesCalendarDate);

  useEffect(() => {
    setFormOpened(false);
  }, [notesCalendarDate]);

  const openFormHandler = () => {
    setFormOpened(true);
  };

  const closeFormHandler = () => {
    setFormOpened(false);
  };

  const isFormOpened = formOpened || !moods?.length;

  return (
    <div className={styles.mood}>
      <div className={styles.moodHeader}>
        <h3 className={styles.title}>Настроение</h3>
        {!isFormOpened && (
          <Button
            onClick={openFormHandler}
            className={styles.addButton}
          >
            <AddCircle />
          </Button>
        )}
      </div>
      {isFormOpened && <MoodForm onSubmitAction={closeFormHandler} />}
      <MoodList />
    </div>
  );
};
