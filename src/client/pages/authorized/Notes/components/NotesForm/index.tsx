import { NoteList } from "./components/NoteList";
import styles from "./styles.module.scss";
import { type FC } from "react";

export const NotesForm: FC = () => {
  return (
    <div className={styles.notes}>
      <h2 className={styles.title}>Заметки</h2>
      <NoteList />
      {/*<PrimaryButton className={styles.button}>Написать заметку</PrimaryButton>*/}
    </div>
  );
};
