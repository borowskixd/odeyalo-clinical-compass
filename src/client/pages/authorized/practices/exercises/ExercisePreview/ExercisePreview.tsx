"use client";

import { ExercisePageLayout } from "./components";
import { useParams } from "next/navigation";
import { LoadingLoop } from "@/client/components";
import {
  useGetExerciseQuery,
  useGetExerciseResultsQuery,
} from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { pages } from "@/shared/data";
import { mapDatetimeToText } from "@/shared/utils";
import { type FC, useEffect } from "react";

export const ExercisePreviewPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { logEvent } = useAnalytics();

  const { data: exercise, ...getExerciseState } = useGetExerciseQuery(id);
  const { data: exerciseResults, ...getExerciseResultsState } =
    useGetExerciseResultsQuery(id);

  useEffect(() => {
    logEvent("exercise-preview-page-opened", {
      exercise_id: id,
    });
  }, [id, logEvent]);

  if (getExerciseState.isLoading || getExerciseResultsState.isLoading) {
    return <LoadingLoop />;
  }

  return (
    exercise &&
    exerciseResults && (
      <ExercisePageLayout
        imageSrc={exercise.image}
        exerciseTitle={exercise.title}
        exerciseDescription={exercise.description}
        exerciseStartLink={pages.exercise.getLink({
          params: {
            id: exercise.id,
          },
        })}
        history={exerciseResults.results.map((result) => ({
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
    )
  );
};
