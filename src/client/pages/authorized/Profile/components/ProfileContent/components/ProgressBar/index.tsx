import styles from "./styles.module.scss";
import { LoadingLoop } from "@/client/components";
import { useGetCurrentGamificationScoreQuery } from "@/client/redux";
import { Text } from "@odeyalo/uikit";
import { type FC } from "react";

const MAX_SCORE = 40;

export const ProgressBar: FC = () => {
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
      <Text
        variant="body-l-bold"
        className={styles.label}
        as="p"
      >
        Нужно набрать ещё {MAX_SCORE - data.score} очков
      </Text>
    </div>
  );
};
