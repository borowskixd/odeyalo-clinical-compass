import { Card } from "./components";
import styles from "./styles.module.scss";
import { type FC } from "react";

interface Props {
  history: {
    id: string;
    title: string;
    date: string;
    link: string;
  }[];
}

export const History: FC<Props> = ({ history }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>История</h3>
      {history && history.length === 0 && (
        <p className={styles.textInfo}>Появится после прохождения</p>
      )}
      {history && history.length > 0 && (
        <div className={styles.diaryList}>
          {history.map(({ id, title, date, link }) => (
            <Card
              key={id}
              id={id}
              title={title}
              date={date}
              link={link}
            />
          ))}
        </div>
      )}
    </div>
  );
};
