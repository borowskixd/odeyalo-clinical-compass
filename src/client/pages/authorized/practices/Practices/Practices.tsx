import { type FC } from "react";
import { ForEveryDay, Practices } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";

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
