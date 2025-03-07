import { HistoryList, TextAndStart } from "./components";
import styles from "./styles.module.scss";
import { type FC } from "react";

export const StartAndHistory: FC = () => {
  return (
    <section className={styles.container}>
      <TextAndStart />
      <HistoryList />
    </section>
  );
};
