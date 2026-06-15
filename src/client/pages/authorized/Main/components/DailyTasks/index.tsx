"use client";

import { Button, Icon, Icons24Solid } from "@odeyalo/uikit";
import { type FC, useEffect, useRef, useState } from "react";
import { type Swiper as SwiperInstance } from "swiper";
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
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    logEvent("main-page-opened");
  }, [logEvent]);

  if (isError || !dailyTasks || !dailyTasks.length) return null;

  const visibleDailyTasks = dailyTasks.filter(({ taskType }) =>
    EXISTING_DAILY_TASKS.includes(taskType),
  );

  if (!visibleDailyTasks.length) return null;

  const updateNavigationState = (swiper: SwiperInstance) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiperInit = (swiper: SwiperInstance) => {
    swiperRef.current = swiper;
    updateNavigationState(swiper);
  };

  const renderContent = () => {
    if (isLoading) return <LoadingLoop />;

    return (
      <div className={styles.carousel}>
        <Swiper
          slidesPerView={visibleDailyTasks.length > 2 ? 2.2 : 2}
          spaceBetween={16}
          setWrapperSize={false}
          onSwiper={handleSwiperInit}
          onSlideChange={updateNavigationState}
          onResize={updateNavigationState}
        >
          {visibleDailyTasks.map((dailyTask) => (
            <SwiperSlide key={dailyTask.id}>
              <DailyTaskCard dailyTask={dailyTask} />
              {dailyTask.title && (
                <div className={styles.cardTitle}>{dailyTask.title}</div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        {visibleDailyTasks.length > 2 && (
          <>
            <Button
              type="button"
              view="unstyled"
              className={`${styles.navigationButton} ${styles.previousButton}`}
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Предыдущие задачи"
            >
              <Icon
                size={32}
                data={Icons24Solid.ChevronLeftIcon}
              />
            </Button>
            <Button
              type="button"
              view="unstyled"
              className={`${styles.navigationButton} ${styles.nextButton}`}
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Следующие задачи"
            >
              <Icon
                size={32}
                data={Icons24Solid.ChevronRightIcon}
              />
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <ContentWrapper>
      <PageTitle className={styles.title}>План на сегодня</PageTitle>
      {renderContent()}
    </ContentWrapper>
  );
};
