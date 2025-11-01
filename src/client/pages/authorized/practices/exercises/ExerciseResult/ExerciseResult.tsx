"use client";

import { FormGenerator } from "./components";
import styles from "./styles.module.scss";
import { useParams } from "next/navigation";
import { Text } from "odeyalo-uikit";
import {
  Container,
  ContentWrapper,
  DefaultError,
  LoadingLoop,
} from "@/client/components";
import { ExerciseHeader } from "@/client/pages/authorized/practices/components";
import { useGetExerciseResultQuery } from "@/client/redux";
import { mapDatetimeToText } from "@/shared/utils";
import { type FC } from "react";

export const ExerciseResultPage: FC = () => {
  const { id, result_id } = useParams<{ id: string; result_id: string }>();

  const { data, error, isLoading } = useGetExerciseResultQuery({
    exerciseId: id,
    resultId: result_id,
  });

  if (isLoading) return <LoadingLoop />;
  if (error || !data) return <DefaultError error={error} />;

  const exerciseResultData = data;

  return (
    <Container>
      <ContentWrapper>
        <ExerciseHeader
          title={exerciseResultData.title}
          description={exerciseResultData.description}
          action={
            <div className={styles.datetime}>
              <Text variant="body-s">
                {mapDatetimeToText(exerciseResultData.date)}
              </Text>
            </div>
          }
        />
        <FormGenerator exerciseStructure={exerciseResultData} />
      </ContentWrapper>
    </Container>
  );
};
