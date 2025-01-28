import styles from "./styles.module.scss";
import { PageTitle } from "@/client/components";
import { type FC } from "react";

export const Calendar: FC = () => {
  return (
    <div>
      <PageTitle className={styles.title}>26 ноября</PageTitle>
      <div>Calendar</div>
    </div>
  );
};
