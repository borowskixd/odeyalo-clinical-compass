import { FC } from "react";
import { CreateTaskForm, TaskList } from "./components";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";

export const Tasks: FC = () => {
  return (
    <Container className={styles.container}>
      <ImageBackground />
      <ContentWrapper className={styles.tasks}>
        <PageTitle className={styles.title}>Задачи</PageTitle>
        <CreateTaskForm />
      </ContentWrapper>
      <TaskList />
    </Container>
  );
};
