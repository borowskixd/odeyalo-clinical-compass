import { type FC } from "react";
import { NewNoteForm } from "./components";
import { Container, ContentWrapper } from "@/client/components";

export const NewNotePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <NewNoteForm />
      </ContentWrapper>
    </Container>
  );
};
