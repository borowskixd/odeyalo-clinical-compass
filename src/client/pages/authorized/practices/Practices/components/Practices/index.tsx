"use client";

import cl from "classnames";
import { type FC, useEffect } from "react";
import { PracticeCard } from "../PracticeCard";
import styles from "./styles.module.scss";
import { FormErrorLabel, LoadingLoop } from "@/client/components";
import {
  useGetExercisesQuery,
  useGetTrainingExercisesQuery,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";

export const Practices: FC = () => {
  const getExerciseQuery = useGetExercisesQuery();
  const getTrainingExerciseQuery = useGetTrainingExercisesQuery();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("practices-page-opened");
  }, [logEvent]);

  const renderContent = () => {
    if (getExerciseQuery.isLoading || getTrainingExerciseQuery.isLoading)
      return <LoadingLoop />;

    if (getExerciseQuery.isError)
      return (
        <FormErrorLabel>
          {mapApiErrorMessage(getExerciseQuery.error)}
        </FormErrorLabel>
      );

    if (getTrainingExerciseQuery.isError)
      return (
        <FormErrorLabel>
          {mapApiErrorMessage(getTrainingExerciseQuery.error)}
        </FormErrorLabel>
      );

    return (
      <>
        <h3 className={styles.title}>Проработка проблемы</h3>
        <div className={styles.list}>
          {getExerciseQuery.data &&
            getExerciseQuery.data.exercises.map((exercise) => {
              return (
                <PracticeCard
                  key={exercise.id}
                  title={exercise.title}
                  src={exercise.image}
                  link={pages.exercisePreview.getLink({
                    params: { id: exercise.id },
                  })}
                />
              );
            })}
        </div>
        <h3 className={cl(styles.title, styles.trainingTitle)}>
          Обучающие упражнения
        </h3>
        <div className={styles.list}>
          {getTrainingExerciseQuery.data &&
            getTrainingExerciseQuery.data.exercises.map((exercise) => {
              return (
                <PracticeCard
                  key={exercise.id}
                  title={exercise.title}
                  src={exercise.image}
                  link={pages.trainingExercisePreview.getLink({
                    params: { id: exercise.id },
                  })}
                />
              );
            })}
        </div>
      </>
    );
  };

  return <section>{renderContent()}</section>;
};
