"use client";

import { useParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { ExercisePageLayout } from "./components";
import { FormErrorLabel, LoadingLoop } from "@/client/components";
import {
  useGetExerciseQuery,
  useGetExerciseResultsQuery,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { mapDatetimeToText } from "@/shared/utils";

export const ExercisePreviewPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { logEvent } = useAnalytics();

  const { data: exercise, ...getExerciseState } = useGetExerciseQuery(id);
  const { data: exerciseResults, ...getExerciseResultsState } =
    useGetExerciseResultsQuery(id, {
      skip: !exercise || exercise.closed,
    });

  useEffect(() => {
    logEvent("exercise-preview-page-opened", {
      exercise_id: id,
    });
  }, [id, logEvent]);

  if (
    getExerciseState.isLoading ||
    (!exercise?.closed && getExerciseResultsState.isLoading)
  ) {
    return <LoadingLoop />;
  }

  if (getExerciseState.isError) {
    return (
      <FormErrorLabel>
        {mapApiErrorMessage(getExerciseState.error)}
      </FormErrorLabel>
    );
  }

  if (getExerciseResultsState.isError) {
    return (
      <FormErrorLabel>
        {mapApiErrorMessage(getExerciseResultsState.error)}
      </FormErrorLabel>
    );
  }

  if (!exercise) return null;

  return (
    <ExercisePageLayout
      imageSrc={exercise.image}
      exerciseTitle={exercise.title}
      exerciseDescription={exercise.description}
      exerciseStartLink={pages.exercise.getLink({
        params: {
          id: exercise.id,
        },
      })}
      locked={exercise.closed}
      history={exerciseResults?.results.map((result) => ({
        id: result.id,
        title: result.title,
        date: mapDatetimeToText(result.date),
        link: pages.exerciseResult.getLink({
          params: {
            id: result.exerciseId,
            result_id: result.id,
          },
        }),
      }))}
    />
  );
};
