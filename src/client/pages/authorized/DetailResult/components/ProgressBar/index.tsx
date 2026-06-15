"use client";

import { type FC } from "react";
import styles from "./styles.module.scss";
import { InfoButton } from "@/client/components";
import { type GetTestResultResponseData } from "@/shared/types";

interface ProgressBarProps {
  scale: GetTestResultResponseData["scales"][number];
  result: number;
  description?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  scale,
  result,
  description,
}) => {
  const { title, min, max } = scale;

  const color = scale.borders.reduce((acc, border) => {
    if (result <= border.rightBorder && result >= border.leftBorder)
      acc = border.color;

    return acc;
  }, "");

  const percent = (max - min) / 100;
  const valuePercent = (result - min) / percent;

  const getLevelText = () => {
    const middleValue = (max + min) / 2;
    if (result > middleValue) {
      return "Высокий уровень";
    } else if (result < middleValue) {
      return "Низкий уровень";
    } else {
      return "Средний уровень";
    }
  };

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.titleWrapper}>
        <h4 className={styles.resultTitle}>{title}</h4>
        {description && <InfoButton popupText={description} />}
      </div>
      <div className={styles.progressWrapper}>
        <div className={styles.progressLine}>
          <div
            className={styles.progress}
            style={{ width: `${valuePercent}%`, backgroundColor: color }}
          ></div>
        </div>
        <div className={styles.values}>
          <div className={styles.levelText}>{getLevelText()}</div>
          <div>{`${result} из ${max}`}</div>
        </div>
      </div>
    </div>
  );
};
