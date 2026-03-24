"use client";

import { useParams } from "next/navigation";
import { type FC } from "react";
import { ExercisePageLayout } from "../../ExercisePreview/components/ExercisePageLayout";
import { FormErrorLabel, LoadingLoop } from "@/client/components";
import { useGetTrainingExerciseQuery } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";

export const TrainingExercisePreviewPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: trainingExercise,
    isLoading,
    isError,
    error,
  } = useGetTrainingExerciseQuery(id);

  if (isLoading) return <LoadingLoop />;

  if (isError)
    return <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>;

  return (
    trainingExercise && (
      <ExercisePageLayout
        imageSrc={trainingExercise.image}
        exerciseTitle={trainingExercise.title}
        exerciseDescription={trainingExercise.description}
        exerciseStartLink={pages.trainingExercise.getLink({
          params: {
            id: trainingExercise.id,
          },
        })}
        completed={trainingExercise.completed}
      />
    )
  );
};
