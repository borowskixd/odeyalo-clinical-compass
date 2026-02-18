import { type FC } from "react";
import { CreateNoteButton, NoteList } from "./components";
import styles from "./styles.module.scss";

export const NotesForm: FC = () => {
  return (
    <div className={styles.notes}>
      <h2 className={styles.title}>Дневник эмоций</h2>
      <NoteList />
      <CreateNoteButton />
    </div>
  );
};
