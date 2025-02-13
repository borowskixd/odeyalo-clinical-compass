import { Calendar, MoodTracker, NotesForm } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const NotesPage: FC = () => {
  return (
    <Container>
      <ContentWrapper className={styles.container}>
        <Calendar />
        <div className={styles.sidebar}>
          <NotesForm />
          <MoodTracker />
        </div>
      </ContentWrapper>
    </Container>
  );
};
