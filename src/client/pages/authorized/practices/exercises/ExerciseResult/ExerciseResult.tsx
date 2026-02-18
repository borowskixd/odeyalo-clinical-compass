"use client";

import { Text } from "@odeyalo/uikit";
import { useParams } from "next/navigation";
import { type FC, useEffect } from "react";
import { FormGenerator } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  DefaultError,
  LoadingLoop,
} from "@/client/components";
import { ExerciseHeader } from "@/client/pages/authorized/practices/components";
import { useGetExerciseResultQuery } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { mapDatetimeToText } from "@/shared/utils";

export const ExerciseResultPage: FC = () => {
  const { id, result_id } = useParams<{ id: string; result_id: string }>();
  const { logEvent } = useAnalytics();

  const { data, error, isLoading } = useGetExerciseResultQuery({
    exerciseId: id,
    resultId: result_id,
  });

  useEffect(() => {
    logEvent("exercise-result-page-opened");
  }, [logEvent]);

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
