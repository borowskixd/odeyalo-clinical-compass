"use client";

import { TestCard } from "../TestCard";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop, Subtitle } from "@/client/components";
import { useGetTestsQuery } from "@/client/redux";
import { type FC } from "react";

export const TestsList: FC = () => {
  const { data: tests, ...getTestsState } = useGetTestsQuery();

  if (getTestsState.isLoading) return <LoadingLoop />;
  if (getTestsState.isError)
    return <DefaultError error={getTestsState.error} />;

  if (!tests || !tests.length) return <Subtitle>Нет доступных тестов</Subtitle>;

  return (
    <div className={styles.list}>
      {tests.map((test) => {
        return (
          <TestCard
            key={test.id}
            exercise={test}
          />
        );
      })}
    </div>
  );
};
