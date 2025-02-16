import styles from "./styles.module.scss";
import { type FC } from "react";

export const Practices: FC = () => {
  return (
    <section>
      <h3 className={styles.title}>Проработка проблемы</h3>
      <p>Скоро появятся новые упражнения!</p>
    </section>
  );
};
