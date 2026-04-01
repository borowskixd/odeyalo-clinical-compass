"use client";

import { type FC, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { DailyTaskCard } from "../DailyTaskCard";
import styles from "./styles.module.scss";
import { ContentWrapper, LoadingLoop, PageTitle } from "@/client/components";
import { useGetDailyTasksQuery } from "@/client/redux";
import { useAnalytics } from "@/shared/analytics";
import { DAILY_TASK_TYPES } from "@/shared/data";
import { type DailyTaskType } from "@/shared/types";

const EXISTING_DAILY_TASKS: DailyTaskType[] = [
  DAILY_TASK_TYPES.test,
  DAILY_TASK_TYPES.exercise,
];

export const DailyTasks: FC = () => {
  const { logEvent } = useAnalytics();
  const { data: dailyTasks, isLoading, isError } = useGetDailyTasksQuery();

  useEffect(() => {
    logEvent("main-page-opened");
  }, [logEvent]);

  if (isError || !dailyTasks || !dailyTasks.length) return null;

  const renderContent = () => {
    if (isLoading) return <LoadingLoop />;

    return (
      <Swiper
        slidesPerView={dailyTasks.length > 2 ? 2.2 : 2}
        spaceBetween={16}
        setWrapperSize={false}
      >
        {dailyTasks &&
          dailyTasks.map((dailyTask) => {
            if (!EXISTING_DAILY_TASKS.includes(dailyTask.taskType)) return null;

            return (
              <SwiperSlide key={dailyTask.id}>
                <DailyTaskCard dailyTask={dailyTask} />
              </SwiperSlide>
            );
          })}
      </Swiper>
    );
  };

  return (
    <ContentWrapper>
      <PageTitle className={styles.title}>План на сегодня</PageTitle>
      {renderContent()}
    </ContentWrapper>
  );
};
