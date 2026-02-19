import { type FC } from "react";
import styles from "./styles.module.scss";

export const Addition: FC = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{ backgroundImage: 'url("/static/landing/book.webp")' }}
      />
      <div className={styles.textContent}>
        <h2 className={`${styles.title}`}>Научно-доказанный подход</h2>
        <div className={styles.description}>
          Мы основываемся на научных данных
          <br />
          и сами проводим исследования
          <br />
          эффективности нашего приложения
        </div>
      </div>
    </div>
  );
};
