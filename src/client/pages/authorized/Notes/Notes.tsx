import { Calendar, MoodTracker, NotesForm } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const NotesPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <Calendar />
        <NotesForm />
        <MoodTracker />
      </ContentWrapper>
    </Container>
  );
};
