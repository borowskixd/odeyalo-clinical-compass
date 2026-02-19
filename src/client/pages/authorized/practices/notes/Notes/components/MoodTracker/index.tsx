"use client";

import { Button } from "@odeyalo/uikit";
import { type FC, useEffect, useState } from "react";
import { MoodForm, MoodList } from "./components";
import styles from "./styles.module.scss";
import { AddCircle } from "@/client/assets/icons";
import { Button as AppButton } from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import { selectNotesCalendarDate, useGetMoodsQuery } from "@/client/redux";
import { pages } from "@/shared/data";

interface MoodTrackerProps {
  showRedirectButton?: boolean;
}

export const MoodTracker: FC<MoodTrackerProps> = ({
  showRedirectButton = false,
}) => {
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
  const isRedirectButtonEnabled = showRedirectButton && moods?.length;

  return (
    <div className={styles.mood}>
      <div className={styles.moodHeader}>
        <h3 className={styles.title}>Настроение</h3>
        {!isFormOpened && (
          <AppButton
            onClick={openFormHandler}
            className={styles.addButton}
          >
            <AddCircle />
          </AppButton>
        )}
      </div>
      {isFormOpened && <MoodForm onSubmitAction={closeFormHandler} />}
      {!!isRedirectButtonEnabled && (
        <Button
          width="max"
          view="secondary"
          href={pages.notes.path}
          className={styles.redirectButton}
        >
          Перейти к дневнику эмоций
        </Button>
      )}
      {!!moods?.length && <MoodList />}
    </div>
  );
};
