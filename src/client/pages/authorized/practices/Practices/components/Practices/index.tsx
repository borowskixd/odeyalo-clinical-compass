"use client";

import { PracticeCard } from "../PracticeCard";
import styles from "./styles.module.scss";
import { FormErrorLabel, LoadingLoop } from "@/client/components";
import { useGetExercisesQuery } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const Practices: FC = () => {
  const { data, isLoading, isError, error } = useGetExercisesQuery();

  return (
    <section>
      <h3 className={styles.title}>Проработка проблемы</h3>
      {isLoading ? (
        <LoadingLoop />
      ) : isError ? (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      ) : (
        <div className={styles.list}>
          {data &&
            data.exercises.map((exercise) => {
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
      )}
    </section>
  );
};
