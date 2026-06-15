"use client";

import { Text } from "@odeyalo/uikit";
import { type FC } from "react";
import styles from "./styles.module.scss";
import { LoadingLoop } from "@/client/components";
import { useGetCurrentGamificationScoreQuery } from "@/client/redux";

const MAX_SCORE = 40;

interface GamificationProgressBarProps {
  showDescription?: boolean;
}

export const GamificationProgressBar: FC<GamificationProgressBarProps> = ({
  showDescription = true,
}) => {
  const { data, isLoading } = useGetCurrentGamificationScoreQuery();

  if (isLoading || !data) return <LoadingLoop />;

  const progressBarStyle =
    data.score === 0
      ? styles.red
      : data.score >= 30
        ? styles.green
        : styles.yellow;

  const progressLineWidth = (data.score / MAX_SCORE) * 100;

  return (
    <div>
      <div>
        <div className={`${styles.progressBar} ${progressBarStyle}`}>
          <div
            className={styles.progressLine}
            style={{ width: `${progressLineWidth}%` }}
          >
            {data.score}
          </div>
          <div
            className={styles.maxScore}
            style={{ width: `${100 - progressLineWidth}%` }}
          >
            {MAX_SCORE}
          </div>
        </div>
        {showDescription && (
          <Text
            variant="body-l-bold"
            className={styles.label}
            as="p"
          >
            Каждый балл — это маленький шаг к осознанности. Шкала помогает
            поддерживать ритм развития. Чтобы набрать очки, читайте теорию,
            проходите тесты и выполняйте упражнения.
          </Text>
        )}
      </div>
    </div>
  );
};
