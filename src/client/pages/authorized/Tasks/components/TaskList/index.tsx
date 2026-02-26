"use client";

import { Text } from "@odeyalo/uikit";
import { FC, ReactNode } from "react";
import { DayTasks } from "../DayTasks";
import styles from "./styles.module.scss";
import { ContentWrapper, DefaultError, LoadingLoop } from "@/client/components";
import { useGetTasksQuery } from "@/client/redux";
import { mapDateToApiDateFormat } from "@/shared/utils";

export const TaskList: FC = () => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  const renderContent = () => {
    if (isLoading) return <LoadingLoop />;
    if (isError || !tasks) return <DefaultError error={error} />;

    const result: ReactNode[] = [];

    for (const date in tasks.completed) {
      if (date === mapDateToApiDateFormat(new Date())) continue;

      result.push(
        <DayTasks
          key={date}
          date={new Date(date)}
          tasks={tasks.completed[date]}
          readonly
        />,
      );
    }

    return result.length ? (
      result
    ) : (
      <Text variant="body-l-bold">Добавьте свою первую задачу!</Text>
    );
  };

  return (
    <ContentWrapper className={styles.container}>
      <ul className={styles.list}>{renderContent()}</ul>
    </ContentWrapper>
  );
};
