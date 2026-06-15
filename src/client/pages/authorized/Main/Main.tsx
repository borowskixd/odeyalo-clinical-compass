"use client";

import { type FC, useState } from "react";
import { DailyTasks, Onboarding, PraiseCard, TasksPreview } from "./components";
import styles from "./styles.module.scss";
import { WIDGET_INFO_TEXTS } from "./utils";
import {
  Container,
  ContentWrapper,
  InfoButton,
  PageTitle,
} from "@/client/components";
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
            <div className={styles.headerWrapper}>
              <PageTitle className={styles.title}>Ритм дня</PageTitle>
              <InfoButton popupText={WIDGET_INFO_TEXTS.DAILY_RHYTHM} />
            </div>
            <GamificationProgressBar showDescription={false} />
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
            <div className={styles.headerWrapper}>
              <PageTitle className={styles.title}>Задачи</PageTitle>
              <InfoButton popupText={WIDGET_INFO_TEXTS.TASKS} />
            </div>
            <TasksPreview />
          </ContentWrapper>
          <DailyTasks />
        </div>
      </div>
    </Container>
  );
};
