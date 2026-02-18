import { type FC } from "react";
import { ArticlesList } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";

export const ArticlesPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Теория</PageTitle>
        <ArticlesList />
      </ContentWrapper>
    </Container>
  );
};
