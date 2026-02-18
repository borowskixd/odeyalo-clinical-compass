import { type FC } from "react";
import { Content } from "./components";
import { Container, ContentWrapper } from "@/client/components";

export const NotePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <Content />
      </ContentWrapper>
    </Container>
  );
};
