"use client";

import styles from "./styles.module.scss";
import { PrimaryButton } from "@/client/components";
import { type CSSProperties, type ChangeEvent, type FC, useState } from "react";

export const MoodTracker: FC = () => {
  const [mood, setMood] = useState(50);

  const handleMoodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMood(Number(e.target.value));
  };

  const progress = `${(mood / 100) * 100}%`;

  return (
    <div className={styles.mood}>
      <h3 className={styles.title}>Настроение</h3>
      <div className={styles.moodTrackerContainer}>
        <input
          type="range"
          min="0"
          max="100"
          value={mood}
          onChange={handleMoodChange}
          className={styles.moodTracker}
          style={{ "--progress": progress } as CSSProperties}
        />
      </div>
      <div className={styles.moodValueContainer}>
        <div className={styles.moodValue}>
          {mood >= 70 ? "Отлично" : mood >= 40 ? "Нормально" : "Плохо"}
        </div>
      </div>
      <PrimaryButton className={styles.button}>Сохранить</PrimaryButton>
    </div>
  );
};
