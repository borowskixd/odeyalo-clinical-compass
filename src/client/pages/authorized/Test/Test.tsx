import { type FC } from "react";
import { TestContent } from "./components";
import { Container, ContentWrapper } from "@/client/components";

export const TestPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <TestContent />
      </ContentWrapper>
    </Container>
  );
};
