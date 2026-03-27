"use client";

import { Button, Text } from "@odeyalo/uikit";
import cl from "classnames";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Container, ContentWrapper, PageTitle } from "@/client/components";

const CYCLES = 4;
const STAGE_SECONDS = 4;
const READY_SECONDS = 3;
const STAGES = ["BREATH", "PAUSE", "EXHALE", "PAUSE"] as const;

const STAGE_TEXT = {
  "BREATH": "Вдох",
  "PAUSE": "Задержка",
  "EXHALE": "Выдох",
} as const;

export const SquareBreathingPage: FC = () => {
  const totalTime = CYCLES * STAGES.length * STAGE_SECONDS;

  const [readyDelay, setReadyDelay] = useState<number | null>(null);
  const [readySeconds, setReadySeconds] = useState<number | null>(null);
  const [pause, setPause] = useState<boolean>(true);
  const [iteration, setIteration] = useState<number>(0);
  const [stage, setStage] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const [timerStart, setTimerStart] = useState(0);
  const [passedTime, setPassedTime] = useState(0);

  useEffect(() => {
    if (!pause) {
      const interval = setInterval(() => {
        const now = Date.now();

        if (!readyDelay) {
          setReadyDelay(now);
          return;
        }

        const readySeconds =
          READY_SECONDS - Math.floor((now - readyDelay) / 1000);

        if (readySeconds <= 0) {
          const timePassed = Math.floor(passedTime + (now - timerStart) / 1000);
          const timeLeft = totalTime - timePassed;

          if (timeLeft <= 0) {
            setPause(true);
            setTimeLeft(totalTime);
            setIteration(0);
            setStage(0);
            setTimerStart(0);
            setReadyDelay(null);
            setReadySeconds(null);
          } else {
            setTimeLeft(timeLeft);
            setIteration(
              Math.floor((totalTime - timeLeft) / (CYCLES * STAGES.length)),
            );
            setStage(
              Math.floor((totalTime - timeLeft) / STAGE_SECONDS) %
                STAGES.length,
            );
          }
        }

        setReadySeconds(readySeconds);
      }, 50);

      return () => clearInterval(interval);
    } else {
      setPassedTime(totalTime - timeLeft);
    }
  }, [
    pause,
    readyDelay,
    readySeconds,
    setReadyDelay,
    setReadySeconds,
    setPause,
    timerStart,
    setTimerStart,
    passedTime,
    setPassedTime,
    timeLeft,
    setTimeLeft,
    totalTime,
  ]);

  const handleTogglePause = () => {
    if (pause) {
      if (readySeconds && readySeconds > 0) {
        setReadyDelay(null);
        setReadySeconds(null);
      }
      setTimerStart(Date.now() + (!readyDelay ? READY_SECONDS * 1000 : 0));
    }
    setPause(false);
  };

  return (
    <Container>
      <ContentWrapper>
        <PageTitle>Дыхание по квадрату</PageTitle>
        <div className={styles.content}>
          <div className={styles.breathCircleContainer}>
            <Button
              view="unstyled"
              onClick={handleTogglePause}
              readOnly={!pause}
              className={cl(
                styles.breathCircle,
                !pause && readySeconds && readySeconds <= 0
                  ? styles.breath
                  : null,
              )}
            >
              {pause
                ? totalTime === timeLeft
                  ? "Старт"
                  : "Продолжить"
                : readySeconds === null || readySeconds > 0
                  ? (readySeconds ?? READY_SECONDS)
                  : STAGE_TEXT[STAGES[stage]]}
            </Button>
          </div>
          <div className={styles.info}>
            <div className={styles.cycle}>
              {STAGES.map((stageValue, stageIndex) => {
                const active = stageIndex === stage;
                return (
                  <Text
                    key={stageIndex}
                    className={cl(
                      styles.cycleItem,
                      active ? styles.active : null,
                    )}
                    variant="body-m"
                  >
                    <Text
                      variant="title-cygre"
                      className={styles.cycleItemCircle}
                    >
                      {STAGE_SECONDS -
                        (active
                          ? Math.floor(totalTime - timeLeft) % STAGE_SECONDS
                          : 0)}
                    </Text>
                    {STAGE_TEXT[stageValue]}
                  </Text>
                );
              })}
            </div>
            <div className={styles.cards}>
              <div className={styles.card}>
                <Text variant="title-xs">{timeLeft}</Text>
                <Text>секунд до окончания</Text>
              </div>
              <div className={styles.card}>
                <Text variant="title-xs">{iteration}</Text>
                <Text>циклов пройдено</Text>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </Container>
  );
};
