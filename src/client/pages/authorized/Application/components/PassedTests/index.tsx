"use client";

import styles from "./styles.module.scss";
import {
  DefaultError,
  LoadingLoop,
  Subtitle,
  TestCard,
} from "@/client/components";
import { useGetUserPassedTestsQuery } from "@/client/redux";
import { type FC } from "react";

interface Props {
  userId: string;
}

export const PassedTests: FC<Props> = ({ userId }) => {
  const { data: passedTests, ...getUserPassedTestsState } =
    useGetUserPassedTestsQuery(userId);

  if (getUserPassedTestsState.isLoading) return <LoadingLoop />;
  if (getUserPassedTestsState.isError)
    return <DefaultError error={getUserPassedTestsState.error} />;

  return (
    <>
      <Subtitle>
        {!!passedTests && !!passedTests.length
          ? "Пройденные тесты"
          : "Нет пройденных тестов"}
      </Subtitle>
      {!!passedTests && !!passedTests.length && (
        <div className={styles.tests}>
          {passedTests.map((el) => {
            return (
              <TestCard
                key={el.id}
                test={el}
                params={{ userId }}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
