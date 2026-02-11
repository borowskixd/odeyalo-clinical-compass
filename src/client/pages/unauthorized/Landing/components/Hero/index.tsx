import styles from "./styles.module.scss";
import { type FC } from "react";

export const Hero: FC = () => {
  return (
    <section className={styles.mainSection}>
      <h1 className={styles.title}>
        Найдите путь
        <br />к <strong className={styles.strong}>душевному спокойствию</strong>
        <br />и{" "}
        <strong className={styles.strong}>эмоциональной стабильности</strong>
      </h1>
    </section>
  );
};
