import { Content } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const NotePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </Container>
  );
};
