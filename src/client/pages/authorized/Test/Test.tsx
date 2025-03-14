import { TestContent } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const TestPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <TestContent />
      </ContentWrapper>
    </Container>
  );
};
