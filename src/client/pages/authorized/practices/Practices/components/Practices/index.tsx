"use client";

import cl from "classnames";
import { type FC, useEffect } from "react";
import { PracticeCard } from "../PracticeCard";
import styles from "./styles.module.scss";
import { POPUP_TEXTS } from "./utils";
import { FormErrorLabel, InfoButton, LoadingLoop } from "@/client/components";
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
        <div className={styles.headerWrapper}>
          <h3 className={styles.title}>Изучаем себя</h3>
          <InfoButton popupText={POPUP_TEXTS.STUDYING_OURSELVES} />
        </div>
        <div className={styles.list}>
          {getExerciseQuery.data &&
            getExerciseQuery.data.exercises.map((exercise) => {
              return (
                <PracticeCard
                  key={exercise.id}
                  title={exercise.title}
                  src={exercise.image}
                  locked={exercise.closed}
                  link={pages.exercisePreview.getLink({
                    params: { id: exercise.id },
                  })}
                />
              );
            })}
        </div>
        {getExerciseQuery.data &&
          getExerciseQuery.data.relatedExercises.length > 0 && (
            <>
              <div className={cl(styles.headerWrapper, styles.sectionHeader)}>
                <h3 className={styles.title}>Работа с проблемой</h3>
              </div>
              <div className={styles.list}>
                {getExerciseQuery.data.relatedExercises.map((exercise) => {
                  return (
                    <PracticeCard
                      key={exercise.id}
                      title={exercise.title}
                      src={exercise.image}
                      locked={exercise.closed}
                      link={pages.exercisePreview.getLink({
                        params: { id: exercise.id },
                      })}
                    />
                  );
                })}
              </div>
            </>
          )}
        <div className={cl(styles.headerWrapper, styles.sectionHeader)}>
          <h3 className={styles.title}>Обучающие упражнения</h3>
          <InfoButton popupText={POPUP_TEXTS.TRAINING_EXERCISES} />
        </div>
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
