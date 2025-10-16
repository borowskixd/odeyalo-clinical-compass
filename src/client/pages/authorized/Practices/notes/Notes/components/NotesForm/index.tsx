import { CreateNoteButton, NoteList } from "./components";
import styles from "./styles.module.scss";
import { type FC } from "react";

export const NotesForm: FC = () => {
  return (
    <div className={styles.notes}>
      <h2 className={styles.title}>Заметки</h2>
      <NoteList />
      <CreateNoteButton />
    </div>
  );
};
