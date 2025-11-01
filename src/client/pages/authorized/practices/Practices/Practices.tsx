import { ForEveryDay, Practices } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { type FC } from "react";

export const PracticesPage: FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>Практика</PageTitle>
        <div className={styles.main}>
          <ForEveryDay />
          <Practices />
        </div>
      </ContentWrapper>
    </Container>
  );
};
