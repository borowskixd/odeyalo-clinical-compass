"use client";

import { useSearchParams } from "next/navigation";
import { type FC } from "react";
import styles from "./styles.module.scss";
import {
  Container,
  ContentWrapper,
  DefaultError,
  GiveExerciseCard,
  LoadingLoop,
  PageTitle,
  Subtitle,
} from "@/client/components";
import { useGetTestsQuery } from "@/client/redux";

export const GiveTestPage: FC = () => {
  const searchParams = useSearchParams();

  const { data: tests, ...getTestsState } = useGetTestsQuery();

  if (getTestsState.isLoading) return <LoadingLoop />;
  if (getTestsState.isError)
    return <DefaultError error={getTestsState.error} />;

  return (
    <Container>
      <ContentWrapper>
        <PageTitle>Задания для клиента</PageTitle>
        <div className={styles.section}>
          <Subtitle>
            {!!tests && !!tests.length ? "Тесты" : "Нет доступных тестов"}
          </Subtitle>
          {!!tests && !!tests.length && (
            <div className={styles.list}>
              {tests.map((test) => {
                return (
                  <GiveExerciseCard
                    key={test.id}
                    exercise={test}
                    userId={searchParams.get("userId") ?? ""}
                  />
                );
              })}
            </div>
          )}
        </div>
      </ContentWrapper>
    </Container>
  );
};
