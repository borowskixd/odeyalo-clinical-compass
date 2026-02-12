import { DailyTasks } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";
import { getCurrentDay } from "@/shared/utils";
import { type FC } from "react";

export const MainPage: FC = () => {
  return (
    <Container>
      <ImageBackground />
      <ContentWrapper className={styles.dailyTasks}>
        <PageTitle className={styles.title}>Задачи на сегодня</PageTitle>
        <div className={styles.date}>{getCurrentDay()}</div>
        <DailyTasks />
      </ContentWrapper>
    </Container>
  );
};
