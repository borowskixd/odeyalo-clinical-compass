import styles from "./styles.module.scss";
import { PrimaryButton } from "@/client/components";
import { type FC } from "react";

export const NotesForm: FC = () => {
  return (
    <div className={styles.notes}>
      <h2 className={styles.title}>Заметки</h2>
      <p>Напиши, как прошёл день, как себя чувствуешь :)</p>
      <PrimaryButton className={styles.button}>Написать заметку</PrimaryButton>
    </div>
  );
};
