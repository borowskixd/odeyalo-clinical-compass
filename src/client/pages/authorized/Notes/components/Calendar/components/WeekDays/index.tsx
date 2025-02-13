import styles from "./styles.module.scss";
import { type FC, type ReactNode } from "react";

interface WeekDaysProps {
  days: ReactNode[];
}

export const WeekDays: FC<WeekDaysProps> = ({ days }) => {
  return (
    <div className={styles.weekDays}>
      <div className={styles.weekDay}>
        <span>ПН</span>
        {days[0]}
      </div>
      <div className={styles.weekDay}>
        <span>ВТ</span>
        {days[1]}
      </div>
      <div className={styles.weekDay}>
        <span>СР</span>
        {days[2]}
      </div>
      <div className={styles.weekDay}>
        <span>ЧТ</span>
        {days[3]}
      </div>
      <div className={styles.weekDay}>
        <span>ПТ</span>
        {days[4]}
      </div>
      <div className={styles.weekDay}>
        <span>СБ</span>
        {days[5]}
      </div>
      <div className={styles.weekDay}>
        <span>ВС</span>
        {days[6]}
      </div>
    </div>
  );
};
