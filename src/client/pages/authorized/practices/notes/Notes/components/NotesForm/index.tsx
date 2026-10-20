import { type FC } from "react";
import styles from "./styles.module.scss";

export const NotesForm: FC = () => {
  return (
    <div className={styles.notes}>
      <h2 className={styles.title}>Дневник эмоций</h2>
      <p>Напиши, как прошёл день, как себя чувствуешь :)</p>
    </div>
  );
};
