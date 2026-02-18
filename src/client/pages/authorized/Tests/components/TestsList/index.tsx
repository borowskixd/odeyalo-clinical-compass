"use client";

import { type FC, useEffect } from "react";
import { TestCard } from "../TestCard";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop, Subtitle } from "@/client/components";
import { useGetTestsQuery } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";

export const TestsList: FC = () => {
  const { data: tests, ...getTestsState } = useGetTestsQuery();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    logEvent("tests-page-opened");
  }, [logEvent]);

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
