"use client";

import { useParams } from "next/navigation";
import { type FC } from "react";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  DefaultError,
  ExerciseResultCard,
  LoadingLoop,
  PageTitle,
  ProfileCard,
  Subtitle,
  TestCard,
} from "@/client/components";
import { useAppSelector } from "@/client/hooks";
import {
  selectRole,
  useGetClientQuery,
  useGetUserPassedExercisesQuery,
  useGetUserPassedTestsQuery,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access";

export const ClientPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const role = useAppSelector(selectRole);

  const { data: client, ...getClientState } = useGetClientQuery(id);
  const { data: passedTests, ...getUserPassedTestsState } =
    useGetUserPassedTestsQuery(id);
  const { data: passedExercises, ...getUserPassedExercisesState } =
    useGetUserPassedExercisesQuery(id);

  if (
    getClientState.isLoading ||
    getUserPassedTestsState.isLoading ||
    getUserPassedExercisesState.isLoading
  ) {
    return <LoadingLoop />;
  }

  if (getClientState.isError) {
    return <DefaultError error={getClientState.error} />;
  }

  if (getUserPassedTestsState.isError) {
    return <DefaultError error={getUserPassedTestsState.error} />;
  }

  if (getUserPassedExercisesState.isError) {
    return <DefaultError error={getUserPassedExercisesState.error} />;
  }

  return (
    <Container>
      <ContentWrapper>
        <PageTitle className={styles.title}>
          Профиль {role === ACCESS.psychologist ? "клиента" : "сотрудника"}
        </PageTitle>
        <div className={styles.main}>
          {client && <ProfileCard profile={client} />}
          <div>
            <Subtitle>
              {!!passedTests && !!passedTests.length
                ? "Пройденные тесты"
                : "Нет пройденных тестов"}
            </Subtitle>
            {!!passedTests && !!passedTests.length && (
              <div className={styles.tests}>
                {passedTests.map((test) => {
                  return (
                    <TestCard
                      key={test.id}
                      test={test}
                      params={{ userId: id }}
                    />
                  );
                })}
              </div>
            )}

            <div className={styles.section}>
              <Subtitle>
                {!!passedExercises && !!passedExercises.results.length
                  ? "Пройденные упражнения"
                  : "Нет пройденных упражнений"}
              </Subtitle>
              {!!passedExercises && !!passedExercises.results.length && (
                <div className={styles.tests}>
                  {passedExercises.results.map((result) => {
                    return (
                      <ExerciseResultCard
                        key={result.id}
                        result={result}
                        userId={id}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </ContentWrapper>
    </Container>
  );
};
