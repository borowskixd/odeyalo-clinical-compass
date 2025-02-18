import { NewNoteForm, NoteDate } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const NewNotePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <NoteDate />
        <NewNoteForm />
      </ContentWrapper>
    </Container>
  );
};
