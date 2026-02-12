"use client";

import { DailyTaskCard } from "../DailyTaskCard";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetDailyTasksQuery } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { DAILY_TASK_TYPES } from "@/shared/data";
import { type DailyTaskType } from "@/shared/types";
import { type FC, useEffect, useState } from "react";

const EXISTING_DAILY_TASKS: DailyTaskType[] = [
  DAILY_TASK_TYPES.theory,
  DAILY_TASK_TYPES.test,
  DAILY_TASK_TYPES.moodTracker,
  DAILY_TASK_TYPES.kptDiary,
];

export const DailyTasks: FC = () => {
  const [activeTaskId, setActiveIdTask] = useState<string | null>(null);
  const { logEvent } = useAnalytics();
  const {
    data: dailyTasks,
    isLoading,
    isError,
    error,
  } = useGetDailyTasksQuery();

  useEffect(() => {
    logEvent("main-page-opened");
  }, [logEvent]);

  useEffect(() => {
    if (dailyTasks) {
      const firstUncompletedTask = dailyTasks.find(
        ({ completed, taskType }) =>
          !completed && EXISTING_DAILY_TASKS.includes(taskType),
      );

      if (firstUncompletedTask) setActiveIdTask(firstUncompletedTask.id);
    }
  }, [dailyTasks]);

  if (isLoading) return <LoadingLoop />;
  if (isError) return <DefaultError error={error} />;

  return (
    <div className={styles.cards}>
      {dailyTasks &&
        dailyTasks.map((dailyTask) => {
          return (
            <DailyTaskCard
              key={dailyTask.id}
              dailyTask={dailyTask}
              isActive={activeTaskId === dailyTask.id}
              isExist={EXISTING_DAILY_TASKS.includes(dailyTask.taskType)}
            />
          );
        })}
    </div>
  );
};
