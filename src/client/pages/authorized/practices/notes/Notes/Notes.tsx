import { type FC } from "react";
import { Calendar, MoodChart, MoodTracker, NotesForm } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper } from "@/client/components";

export const NotesPage: FC = () => {
  return (
    <Container>
      <ContentWrapper className={styles.container}>
        <div className={styles.leftColumn}>
          <Calendar />
          <MoodChart />
        </div>
        <div className={styles.sidebar}>
          <NotesForm />
          <MoodTracker />
        </div>
      </ContentWrapper>
    </Container>
  );
};
