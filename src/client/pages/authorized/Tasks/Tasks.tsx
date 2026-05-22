"use client";

import { Icon, Icons24Solid } from "@odeyalo/uikit";
import { FC, useState } from "react";
import { CreateTaskForm, TaskList } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";
import { Onboarding } from "@/client/pages/authorized/Tasks/components/Onboarding";
import { useGetTasksQuery } from "@/client/redux";

export const Tasks: FC = () => {
  const { data: tasksData } = useGetTasksQuery();

  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const totalTasksCount =
    Object.values(tasksData?.completed || {}).flat().length +
    Object.values(tasksData?.uncompleted || {}).flat().length;

  const hasNoTasks = totalTasksCount === 0;

  return (
    <Container className={styles.container}>
      <ImageBackground />
      <ContentWrapper className={styles.tasks}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <PageTitle className={styles.title}>Задачи</PageTitle>
            {!hasNoTasks && (
              <button
                onClick={() => setIsOnboardingOpen(!isOnboardingOpen)}
                className={`${styles.collapseButton} ${isOnboardingOpen ? styles.rotated : ""}`}
                aria-label={
                  isOnboardingOpen ? "Скрыть подсказки" : "Показать подсказки"
                }
              >
                <Icon
                  data={
                    isOnboardingOpen
                      ? Icons24Solid.ChevronUpIcon
                      : Icons24Solid.ChevronDownIcon
                  }
                  size={32}
                />
              </button>
            )}
          </div>
          {(hasNoTasks || isOnboardingOpen) && <Onboarding />}
          <CreateTaskForm />
        </div>
      </ContentWrapper>
      <TaskList />
    </Container>
  );
};
