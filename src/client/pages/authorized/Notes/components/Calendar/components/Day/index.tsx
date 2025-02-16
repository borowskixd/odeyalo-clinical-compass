import styles from "./styles.module.scss";
import { Button } from "@/client/components";
import { type FC } from "react";

interface WeekDaysProps {
  date?: Date | null;
  selected?: boolean;
  marked?: boolean;
  onClick: (date: Date) => void;
}

export const Day: FC<WeekDaysProps> = ({
  date = null,
  selected = false,
  marked = false,
  onClick,
}) => {
  const isDisabled = !!date && date > new Date();

  return (
    <Button
      className={`${styles.day} ${date && selected && styles.selected} ${date && marked && styles.marked}`}
      onClick={() => {
        if (date) onClick(date);
      }}
      disabled={isDisabled}
    >
      {date && date.getDate()}
    </Button>
  );
};
