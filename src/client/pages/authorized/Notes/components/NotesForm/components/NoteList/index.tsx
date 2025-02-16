import { Note } from "../Note";
import styles from "./styles.module.scss";
import { type FC } from "react";

export const NoteList: FC = () => {
  const notes: { text: string; time: string }[] = [
    // {
    //   text: "Заметка раз-раз-раз",
    //   time: "9:28",
    // },
  ];

  return (
    <div className={`${styles.list} ${!notes.length && styles.empty}`}>
      {/*{!notes.length && <p>Напиши, как прошёл день, как себя чувствуешь :)</p>}*/}
      {!notes.length && <p>Заметки скоро появятся...</p>}
      {notes.map((note, index) => (
        <Note
          key={index}
          text={note.text}
          time={note.time}
        />
      ))}
    </div>
  );
};
