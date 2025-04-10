"use client";

import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import problemDefinition from "@/client/assets/webp/pictures/problemDefinition.webp";
import { DefaultError, LoadingLoop, PageTitle } from "@/client/components";
import { ImageContentPageLayout } from "@/client/components/layouts";
import { ExerciseTextareaResult } from "@/client/pages/authorized/exercises/components";
import { useGetProblemDefinitionQuery } from "@/client/redux";
import { formatDate } from "@/shared/utils";
import { type FC } from "react";

export const ProblemDefinitionResultPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: diary,
    isLoading,
    isError,
    error,
  } = useGetProblemDefinitionQuery(id);

  if (isLoading) return <LoadingLoop />;
  if (isError || !diary) return <DefaultError error={error} />;

  return (
    <ImageContentPageLayout
      imageSrc={problemDefinition.src}
      className={styles.content}
    >
      <div className={styles.date}>{formatDate(diary.createdAt)}</div>
      <PageTitle>Определение групп (категорий) проблем</PageTitle>
      <div className={styles.answers}>
        <ExerciseTextareaResult
          value={diary.sphere}
          labelText={"В какой сфере вы испытываете трудности?"}
        />
        <ExerciseTextareaResult
          value={diary.emotion}
          labelText={"Что вы чувствуете по этому поводу?"}
        />
        <ExerciseTextareaResult
          value={diary.target}
          labelText={"Чего вы хотите добиться, когда решите проблему?"}
        />
      </div>
    </ImageContentPageLayout>
  );
};
