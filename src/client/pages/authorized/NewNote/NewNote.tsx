import { NewNoteForm } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const NewNotePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <NewNoteForm />
      </ContentWrapper>
    </Container>
  );
};
