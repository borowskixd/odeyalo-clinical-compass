import { ExercisesList } from "./components";
import styles from "./styles.module.scss";
import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

export const ExercisesPage: FC = () => {
  return (
    <Container className={styles.container}>
      <PageTitle className={styles.title}>Тесты</PageTitle>
      <ExercisesList />
    </Container>
  );
};
