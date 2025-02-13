import styles from "./styles.module.scss";
import { type FC } from "react";

interface WeekDaysProps {
  date?: number | null;
  selected?: boolean;
  marked?: boolean;
  onClick: (date: number) => void;
}

export const Day: FC<WeekDaysProps> = ({
  date = null,
  selected = false,
  marked = false,
  onClick,
}) => {
  return (
    <div
      className={`${styles.day} ${date && selected && styles.selected} ${date && marked && styles.marked}`}
      onClick={() => {
        if (date) onClick(date);
      }}
    >
      {date}
    </div>
  );
};
