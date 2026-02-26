import { FC } from "react";
import { CreateTaskForm, TaskList } from "./components";
import styles from "./styles.module.scss";
import { Container } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";

export const Tasks: FC = () => {
  return (
    <Container className={styles.container}>
      <ImageBackground />
      <CreateTaskForm />
      <TaskList />
    </Container>
  );
};
