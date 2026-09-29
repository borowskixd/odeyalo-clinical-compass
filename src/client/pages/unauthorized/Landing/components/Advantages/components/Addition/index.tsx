import { type FC } from "react";
import { TextLinks } from "./components";
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
          Мы основываемся на научных
          <br />
          данных и сами проводим исследования эффективности
          <br />
          нашего приложения
        </div>
      </div>
      <div className={styles.textLinksWrapper}>
        <TextLinks />
      </div>
    </div>
  );
};
