import { type FC } from "react";
import { ArticleContent } from "./components";
import { Container, ContentWrapper } from "@/client/components";

export const ArticlePage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <ArticleContent />
      </ContentWrapper>
    </Container>
  );
};
