"use client";

import { type FC } from "react";
import { Onboarding } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  PageTitle,
} from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";

export const MainPage: FC = () => {
  return (
    <Container>
      <ImageBackground />
      <div className={styles.widgets}>
        <div className={`${styles.column} ${styles.first}`}>
          <ContentWrapper>
            <PageTitle className={styles.title}>Главная</PageTitle>
          </ContentWrapper>
        </div>
        <div className={`${styles.column} ${styles.second}`}>
          <ContentWrapper>
            <Onboarding />
          </ContentWrapper>
        </div>
      </div>
    </Container>
  );
};
