import { type FC } from "react";
import { ResultContent } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";

export const DetailResultPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Результаты теста</PageTitle>
        <ResultContent />
      </ContentWrapper>
    </Container>
  );
};
