"use client";

import { type FC, useState } from "react";
import { DailyTasks, Onboarding, PraiseCard, TasksPreview } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";
import { MoodTracker } from "@/client/pages/authorized/practices/notes/Notes/components";
import { GamificationProgressBar } from "@/client/pages/authorized/Profile/components/ProfileContent/components";

export const MainPage: FC = () => {
  const [isPraiseVisible, setIsPraiseVisible] = useState(true);

  const handleClosePraise = () => {
    setIsPraiseVisible(false);
  };

  return (
    <Container>
      <ImageBackground />
      <div className={styles.widgets}>
        <div className={`${styles.column} ${styles.first}`}>
          {isPraiseVisible && <PraiseCard onClose={handleClosePraise} />}
          <ContentWrapper>
            <PageTitle className={styles.title}>Ритм дня</PageTitle>
            <GamificationProgressBar />
          </ContentWrapper>
          <ContentWrapper>
            <MoodTracker showRedirectButton />
          </ContentWrapper>
        </div>
        <div className={`${styles.column} ${styles.second}`}>
          <ContentWrapper>
            <Onboarding />
          </ContentWrapper>
          <ContentWrapper>
            <PageTitle className={styles.title}>Задачи</PageTitle>
            <TasksPreview />
          </ContentWrapper>
          <DailyTasks />
        </div>
      </div>
    </Container>
  );
};
