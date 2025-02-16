import styles from "./styles.module.scss";
import { ArrowLeft, ArrowRight } from "@/client/assets/icons";
import { Button } from "@/client/components";
import { compareDates, months } from "@/shared/utils";
import { type FC } from "react";

interface HeaderProps {
  date: Date;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
}

export const Header: FC<HeaderProps> = ({
  date,
  prevMonthHandler,
  nextMonthHandler,
}) => {
  const isCurrentMonth = compareDates(date, "current", {
    fullYear: true,
    month: true,
  });

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        {months[date.getMonth()]} {date.getFullYear()}
      </h2>
      <div className={styles.buttons}>
        <Button
          className={styles.button}
          onClick={prevMonthHandler}
        >
          <ArrowLeft />
        </Button>
        <Button
          className={styles.button}
          onClick={nextMonthHandler}
          disabled={isCurrentMonth}
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
