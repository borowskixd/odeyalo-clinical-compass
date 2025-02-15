import styles from "./styles.module.scss";
import { ArrowLeft, ArrowRight } from "@/client/assets/icons";
import { Button } from "@/client/components";
import { months } from "@/shared/utils";
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
        >
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};
