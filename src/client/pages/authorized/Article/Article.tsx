import { ArticleContent } from "./components";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const ArticlePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <ArticleContent />
      </ContentWrapper>
    </Container>
  );
};
