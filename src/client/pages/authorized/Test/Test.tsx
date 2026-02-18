import { TestContent } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper } from "@/client/components";
import { type FC } from "react";

export const TestPage: FC = () => {
  return (
    <Container className={styles.container}>
      <ContentWrapper>
        <TestContent />
      </ContentWrapper>
    </Container>
  );
};
