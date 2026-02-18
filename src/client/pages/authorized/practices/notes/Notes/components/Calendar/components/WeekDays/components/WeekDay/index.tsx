import { type FC, type ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props {
  weekDay: string;
  days: ReactNode;
}

export const WeekDay: FC<Props> = ({ weekDay, days }) => {
  return (
    <div className={styles.weekDay}>
      <span>{weekDay}</span>
      {days}
    </div>
  );
};
