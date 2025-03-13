import { TestsList } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { type FC } from "react";

export const TestsPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Тесты</PageTitle>
        <TestsList />
      </ContentWrapper>
    </Container>
  );
};
