import { ArticlesList } from "./components";
import styles from "./styles.module.scss";
import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

export const ArticlesPage: FC = () => {
  return (
    <Container className={styles.container}>
      <PageTitle className={styles.title}>Теория</PageTitle>
      <ArticlesList />
    </Container>
  );
};
